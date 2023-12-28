import express from "express";
import * as user from "./user.controller.js";
import { protectedRoutes } from "../../middleware/auth.js";
import { uploadMultipleFiles } from "../../../multer/multer.js";

const userRouter = express.Router();

let arrFields = [
  { name: "imgCover", maxCount: 1 },
  { name: "images", maxCount: 20 },
];

userRouter.post(
  "/sign-up",
  uploadMultipleFiles(arrFields, "user"),
  user.signUp
);
userRouter.get("/confirmEmail/:token", user.confirmEmail);
userRouter.patch("/forgetPassword", user.forgetPassword);
userRouter.patch("/resetPassword/:token", user.resetPassword);
userRouter.post("/sign-in", user.signIn);
userRouter.get("/getAllUsers", user.getAllUsers);
userRouter.put("/updateUser", protectedRoutes, user.updateUser);
userRouter.patch("/logout", protectedRoutes, user.logOut);

export default userRouter;
