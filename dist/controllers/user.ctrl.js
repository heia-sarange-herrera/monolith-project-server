"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUserById = getUserById;
const user_models_1 = require("../models/user.models");
const serializedUserData_1 = require("../helpers/serializedUserData");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function getUser(req, res) {
    res.status(200).json({
        message: "OK",
    });
}
/*
    path: users/reg
    method: POST
    desc: to create new user
*/
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body || {};
        if (!username || !password) {
            res.status(400).json({ message: "credential not found." });
            return;
        }
        const existingUser = yield user_models_1.User.findOne({ username }).select("-password");
        if (existingUser) {
            res.status(400).json({
                message: "user already taken, choose another.",
            });
            return;
        }
        const fixedName = (0, serializedUserData_1.serializedData)(username);
        const newUser = new user_models_1.User({ username: fixedName, password });
        try {
            yield newUser.save();
            res.status(201).json({
                message: `${newUser.username} created.`,
            });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ message: error });
            return;
        }
    });
}
/**
 *  path: users/login
 *  method: POST
 */
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body || {};
        if (!username || !password) {
            res.status(400).json({
                message: "credential not found.",
            });
            return;
        }
        const foundUser = yield user_models_1.User.findOne({ username });
        if (!foundUser) {
            res.status(400).json({
                message: "user not found.",
            });
            return;
        }
        const isUserFoundMatch = yield bcryptjs_1.default.compare(password, foundUser.password);
        if (!isUserFoundMatch) {
            res.status(400).json({
                message: "incorrect credentials, try again.",
            });
            return;
        }
        //successfully logged.
        res.status(201).json({
            message: "Logged in",
            user: {
                username: foundUser.username,
                id: foundUser._id,
            },
        });
        return;
    });
}
/**
 *  path: users/:id
 */
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "empty arguments.",
            });
            return;
        }
        const user = yield user_models_1.User.findById(id).select("-password");
        res.status(200).json({
            message: "successful.",
            user,
        });
        return;
    });
}
