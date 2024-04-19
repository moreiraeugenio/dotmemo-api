import express from "express";
import * as userResource from "../resource/user.resource";

export const userRouter = express.Router();

userRouter.post("/register", userResource.register);
