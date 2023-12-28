import express from "express";
import * as comment from "./comments.controller.js";
import { protectedRoutes } from "../../middleware/auth.js";

const commentRouter = express.Router();

commentRouter.post(
  "/createComment/:postId",
  protectedRoutes,
  comment.createComment
);
commentRouter.patch(
  "/updateComment/:commentId",
  protectedRoutes,
  comment.updateComment
);
commentRouter.delete(
  "/deleteComment/:commentId",
  protectedRoutes,
  comment.deleteComment
);
commentRouter.patch(
  "/addLikeToComment/:commentId",
  protectedRoutes,
  comment.addLikeToComment
);
commentRouter.patch(
  "/addDisLikeToComment/:commentId",
  protectedRoutes,
  comment.addDisLikeToComment
);
commentRouter.post(
  "/addReplyToComment/:commentId",
  protectedRoutes,
  comment.addReplyToComment
);

export default commentRouter;
