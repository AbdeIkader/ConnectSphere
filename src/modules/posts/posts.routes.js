import express from "express";
import * as post from "./posts.contoller.js";
import { protectedRoutes } from "../../middleware/auth.js";

const postRouter = express.Router();

postRouter.post("/createPost", protectedRoutes, post.createPost);
postRouter.get("/getAllPosts", post.getAllPosts);
postRouter.get(
  "/getAllPostsForSpecificUser",
  protectedRoutes,
  post.getAllPostsForSpecificUser
);
postRouter.get("/getDetailsOfSpecificPost/:_id", post.getDetailsOfSpecificPost);
postRouter.put(
  "/updateSpecifcPost/:_id",
  protectedRoutes,
  post.updateSpecifcPost
);
postRouter.patch(
  "/updatePublicPostsToPrivate/:_id",
  protectedRoutes,
  post.updatePublicPostsToPrivate
);
postRouter.delete(
  "/deleteSpecificPost/:_id",
  protectedRoutes,
  post.deleteSpecificPost
);
postRouter.patch("/addLikeToPost/:_id", protectedRoutes, post.addLikeToPost);
postRouter.patch(
  "/addDisLikeToPost/:_id",
  protectedRoutes,
  post.addDisLikeToPost
);

export default postRouter;
