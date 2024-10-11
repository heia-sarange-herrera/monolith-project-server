"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const database_config_1 = require("./middlewares/database.config");
//local modules
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
try {
    (0, dotenv_1.config)();
    console.log(`environment variables loaded`);
}
catch (error) {
    console.error(error);
}
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.listen(PORT, "0.0.0.0", () => console.log(`Listening on port: ${PORT}`));
//global middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: false,
    },
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.DB_URI,
    }),
}));
//database connection
app.use(database_config_1.connectDatabase);
app.get("/", (req, res) => {
    // req.session.user = {
    //   username: "Heia",
    // };
    res.status(200).json({
        message: "UP",
    });
});
//routes
app.use("/users", user_routes_1.default);
