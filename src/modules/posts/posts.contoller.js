import { postModel } from "../../../Database/models/posts.model.js";
import { userModel } from "../../../Database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

//1- Create a new post.

const createPost = catchAsyncError(async (req, res, next) => {
  // console.log(req.user.id);
  const user = await userModel.findById(req.user.id);
  //   console.log(user);
  if (!user) {
    next(new AppError("User is not exist", 404));
  }
  req.body.userId = req.user.id;

  const result = new postModel(req.body);
  await result.save();

  if (result) {
    res.json({ message: "success", result });
  } else {
    next(new AppError("Post didn't added", 400));
  }
});

//2- Get a list of all posts (for the homepage).

const getAllPosts = catchAsyncError(async (req, res, next) => {
  let result = await postModel.find({});

  res.status(200).json({ message: "success", result });
});

//3- Get all posts of a specific user (for user profiles).

const getAllPostsForSpecificUser = catchAsyncError(async (req, res, next) => {
  let user = await userModel.findById(req.user.id);

  if (user) {
    let result = await postModel.find({ userId: req.user.id });
    res.status(200).json({ message: "success", result });
  } else {
    next(new AppError("User is not exist"), 400);
  }
});

//4- Get details of a specific post.

const getDetailsOfSpecificPost = catchAsyncError(async (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  let result = await postModel.findById(_id);

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(new AppError("Post was not found", 404));
  }
});

//5- Update a specific post (e.g., editing the title or text,private).

const updateSpecifcPost = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { title, text } = req.body;
  const { _id } = req.params;

  let result = await postModel.findOneAndUpdate(
    { userId: id, _id: _id },
    { title, text },
    { new: true }
  );

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(
      new AppError("Post was not found or you're not authorized to do that")
    );
  }
});

//6- Update a specific post from public to private

const updatePublicPostsToPrivate = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { _id } = req.params;

  let result = await postModel.findOneAndUpdate(
    { userId: id, _id: _id },
    { private: "private" },
    { new: true }
  );

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(
      new AppError("Post was not found or you're not authorized to do that")
    );
  }
});

//7- Delete a specific post (only by the owner of the post).

const deleteSpecificPost = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { _id } = req.params;

  let result = await postModel.findOneAndDelete(
    { userId: id, _id: _id },
    { new: true }
  );

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(new AppError("Post was not found or you're not authorized"));
  }
});

//8- Add like to post
const addLikeToPost = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { _id } = req.params;

  let result = await postModel.findOneAndUpdate(
    { _id: _id, private: "all" },
    { $addToSet: { like: id }, $pull: { dislike: id } },
    { new: true }
  );

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(new AppError("Post was not found or you're not authorized"));
  }
});

//9- Add Dislike to post

const addDisLikeToPost = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  const { _id } = req.params;

  let result = await postModel.findOneAndUpdate(
    { _id: _id, private: "all" },
    { $addToSet: { dislike: id }, $pull: { like: id } },
    { new: true }
  );

  if (result) {
    res.status(200).json({ message: "success", result });
  } else {
    next(new AppError("Post was not found or you're not authorized"));
  }
});

export {
  createPost,
  getAllPosts,
  getAllPostsForSpecificUser,
  getDetailsOfSpecificPost,
  updateSpecifcPost,
  updatePublicPostsToPrivate,
  deleteSpecificPost,
  addLikeToPost,
  addDisLikeToPost,
};
