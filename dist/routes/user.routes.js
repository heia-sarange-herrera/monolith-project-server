"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_ctrl_1 = require("../controllers/user.ctrl");
const router = (0, express_1.Router)();
router.post("/reg", user_ctrl_1.createUser);
router.post("/login", user_ctrl_1.loginUser);
router.get("/try", user_ctrl_1.getUser);
router.get("/:id", user_ctrl_1.getUserById);
exports.default = router;
