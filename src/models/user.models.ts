import { Schema, model, CallbackWithoutResultAndOptionalError } from "mongoose";
import bcryptjs from "bcryptjs";
import { IUser } from "../interfaces/model.interface";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      maxlength: 15,
      minlength: 4,
    },
    password: {
      type: String,
      maxlength: 15,
      minlength: 4,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }

    try {
      const saltRounds = 10;
      const hash = await bcryptjs.hash(user.password, saltRounds);
      user.password = hash;
      next();
    } catch (error) {
      next(error as Error);
    }
  }
);

export const User = model<IUser>("User", userSchema);
