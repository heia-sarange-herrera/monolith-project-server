"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.verifyJWToken = verifyJWToken;
const jsonwebtoken_1 = require("jsonwebtoken");
/*
    generate jsonwebtoken
*/
function generateToken(data, jwt_secret) {
    return (0, jsonwebtoken_1.sign)(data, jwt_secret);
}
/*
    verifies jsonwebtoken
*/
function verifyToken(token, jwt_secret) {
    return (0, jsonwebtoken_1.verify)(token, jwt_secret);
}
//middleware
/*
  verifies the jsonwebtoken in middleware
*/
function verifyJWToken(req, res, next) {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
    if (!token) {
        res.status(403).send("A token is required for authentication");
        return;
    }
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token to request object
    }
    catch (err) {
        res.status(401).send("Invalid Token");
        return;
    }
    next();
    return;
}
