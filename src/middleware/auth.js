import { userModel } from "../../Database/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import  jwt  from 'jsonwebtoken';

export const protectedRoutes = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return next(new AppError("Token was not provided!", 401));
  
    let decoded = await jwt.verify(token, "JR");
  
    // console.log(decoded);
    // console.log(decoded.iat);
  
    let user = await userModel.findById(decoded.id);
    if (!user) return next(new AppError("Invalid user", 404));
    // console.log(user);
    // console.log(user.passwordChangedAt);
  
    if (user.passwordChangedAt) {
      let passwordChangedAt = parseInt(user.passwordChangedAt.getTime() / 1000);
      if (passwordChangedAt > decoded.iat)
        return next(new AppError("Invalid token", 401));
    }
    // console.log(decoded.iat, "-------------->",passwordChangedAt);
  
    req.user = user;
    next();
  });