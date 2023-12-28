import { commentModel } from "../../../Database/models/comment.model.js";
import { postModel } from "../../../Database/models/posts.model.js";
import { userModel } from "../../../Database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const createComment = catchAsyncError(async (req, res, next) => {
  //UserId
  //PostId
  // Create comment using save
  const { postId } = req.params;

  req.body.userId = req.user.id;

  req.body.postId = postId;

  let user = await userModel.findById(req.user.id);

  if (!user) {
    next(new AppError("User is not exist", 404));
  }

  let post = await postModel.findOne({ _id: postId, private: "all" });

  if (!post) {
    next(new AppError("Post is not exist", 404));
  }

  let newComment = new commentModel(req.body);

  await newComment.save();

  res.status(200).json({ message: "success", newComment });
});

const updateComment = catchAsyncError(async (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;
  //Check if comment is here or not
  let comment = await commentModel.findById({ _id: commentId });

  if (comment) {
    let updateComment = await commentModel.findOneAndUpdate(
      { _id: commentId, userId: req.user.id },
      { text },
      { new: true }
    );
    res.status(200).json({ message: "success", updateComment });
  } else {
    next(new AppError("Comment was not found", 404));
  }
});

const deleteComment = catchAsyncError(async (req, res, next) => {
  const { commentId } = req.params;
  //Check if comment is here or not
  const comment = await commentModel.findOneAndDelete({
    _id: commentId,
    userId: req.user.id,
  });
  console.log(comment);

  if (comment) {
    res.status(200).json({ message: "success", comment });
  } else {
    next(new AppError("Comment was not found", 404));
  }
});

const addLikeToComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { commentId } = req.params;

  let result = await commentModel.findOneAndUpdate(
    { _id: commentId },
    { $addToSet: { like: id }, $pull: { dislike: id } },
    { new: true }
  );
  console.log(result);

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(new AppError("Comment was not found or you're not authorized"));
  }
});

const addDisLikeToComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { commentId } = req.params;

  let result = await commentModel.findOneAndUpdate(
    { _id: commentId },
    { $addToSet: { dislike: id }, $pull: { like: id } },
    { new: true }
  );

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(new AppError("Comment was not found or you're not authorized"));
  }
});

const addReplyToComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;

  const comment = await commentModel.findOne(postId);

  if (!comment) {
    next(new AppError("Comment was not found", 404));
  }

  const { text } = req.body;
  let reply = new commentModel({
    text,
    userId: id,
    postId: comment.postId,
  });
  await reply.save();

  comment.reply.push(reply._id);
  await comment.save();

  res.status(201).json({ message: "Reply added successfully", reply });
});

export {
  createComment,
  updateComment,
  deleteComment,
  addLikeToComment,
  addDisLikeToComment,
  addReplyToComment,
};
