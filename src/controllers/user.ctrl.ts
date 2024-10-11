import { Request, Response } from "express-serve-static-core";
import { CRequestBody } from "../interfaces/express.interface";
import { User } from "../models/user.models";
import { serializedData } from "../helpers/serializedUserData";
import bcryptjs from "bcryptjs";

export function getUser(req: Request, res: Response) {
  res.status(200).json({
    message: "OK",
  });
}

/*
    path: users/reg
    method: POST
    desc: to create new user
*/
export async function createUser(
  req: Request<{}, {}, CRequestBody>,
  res: Response
): Promise<void> {
  const { username, password } = req.body || {};

  if (!username || !password) {
    res.status(400).json({ message: "credential not found." });
    return;
  }

  const existingUser = await User.findOne({ username }).select("-password");

  if (existingUser) {
    res.status(400).json({
      message: "user already taken, choose another.",
    });
    return;
  }

  const fixedName = serializedData(username);
  const newUser = new User({ username: fixedName, password });

  try {
    await newUser.save();
    res.status(201).json({
      message: `${newUser.username} created.`,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
    return;
  }
}

/**
 *  path: users/login
 *  method: POST
 */
export async function loginUser(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body || {};

  if (!username || !password) {
    res.status(400).json({
      message: "credential not found.",
    });
    return;
  }

  const foundUser = await User.findOne({ username });

  if (!foundUser) {
    res.status(400).json({
      message: "user not found.",
    });
    return;
  }

  const isUserFoundMatch = await bcryptjs.compare(password, foundUser.password);

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
}

/**
 *  path: users/:id
 */
export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "empty arguments.",
    });
    return;
  }

  const user = await User.findById(id).select("-password");

  res.status(200).json({
    message: "successful.",
    user,
  });

  return;
}
