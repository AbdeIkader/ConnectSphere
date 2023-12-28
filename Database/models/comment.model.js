import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const commentModel = model("comment", commentSchema);
