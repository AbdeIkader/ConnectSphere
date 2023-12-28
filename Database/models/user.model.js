import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    imgCover: {
      type: String,
    },
    images: {
      type: [String],
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('posts',{
    localField:'_id',
    foreignField:'userId',
    ref:'post',
})


userSchema.pre(['find','findOne'],function (){
    this.populate('posts')
  })

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, 8);
  }
});


userSchema.post('init', function (doc) {
  if (doc && doc.imgCover && doc.images) {
    doc.imgCover = `${process.env.BASE_URL}user/${doc.imgCover}`;
    doc.images = doc.images.map((ele) => {
      return `${process.env.BASE_URL}user/${ele}`;
    });
  }
});

export const userModel = model("user", userSchema);
