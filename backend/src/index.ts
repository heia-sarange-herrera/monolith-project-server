import { config } from "dotenv";
import { Request, Response } from "express-serve-static-core";
import express from "express";
import session from "express-session";
import cors from "cors";
import { connectDatabase } from "./middlewares/database.config";
//local modules
import userRoutes from "./routes/user.routes";
import MongoStore from "connect-mongo";
try {
  config();
  console.log(`environment variables loaded`);
} catch (error) {
  console.error(error);
}

const PORT: number = <number>process.env.PORT;
const app = express();

app.listen(PORT, "0.0.0.0", () => console.log(`Listening on port: ${PORT}`));

//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: <string>process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 15,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: <string>process.env.DB_URI,
    }),
  })
);

//database connection
app.use(connectDatabase);

app.get("/", (req: Request, res: Response) => {
  // req.session.user = {
  //   username: "Heia",
  // };

  res.status(200).json({
    message: "UP",
  });
});



//routes
app.use("/users", userRoutes);
