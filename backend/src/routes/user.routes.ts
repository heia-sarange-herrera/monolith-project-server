import { Router } from "express";
import { verifyJWToken } from '../middlewares/jwt.mid';
import {
  createUser,
  getUser,
  getUserById,
  loginUser,
} from "../controllers/user.ctrl";

const router = Router();

router.post("/reg", createUser);
router.post("/login", loginUser);

router.get("/try", getUser);
router.get("/:id", getUserById);

export default router;
