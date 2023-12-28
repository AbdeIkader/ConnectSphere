import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    dislike: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    private: {
      type: String,
      default: "all",
      enum: ["private", "all"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("comments", {
  localField: "_id",
  foreignField: "postId",
  ref: "comment",
});

postSchema.pre(["find", "findOne"], function () {
  this.populate("comments");
});
export const postModel = model("post", postSchema);
