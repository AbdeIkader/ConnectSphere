import { userModel } from "../../../Database/models/user.model.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError.js";
import { sendEmail } from "../../../email/nodemailer.js";
import { v1 as uuidv1 } from 'uuid';
import { ApiFeatures } from "../../utils/ApiFeature.js";
//Sign up ----> DONE

const signUp = catchAsyncError(async (req, res, next) => {
  // Check if the user already exists
  console.log(req.files);
  const isUserExist = await userModel.findOne({ email: req.body.email });

  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((ele) => ele.filename);

  if (isUserExist) {
    return next(new AppError("Account is already exist!", 409));
  }

  // Create a new user
  const newUser = new userModel(req.body);
  await newUser.save();

  // Generate a JWT token using the new user's information
  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      userName: newUser.userName,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    },
    process.env.JWT_KEY
  );

  const sentEmail = await sendEmail(
    {
      email: newUser.email,
      token,
    },
    token,
    req.protocol,
    req.headers.host,
    "confirmEmail"

  );

  // console.log(sentEmail); //undefined
  if (!sentEmail) {
    return next(new AppError("Email could not be sent", 500));
  }

  res.status(201).json({ message: "success", user: newUser });
});

//Confrim Email
const confirmEmail = catchAsyncError(async (req, res, next) => {
  // Check if the user already exists
  const { token } = req.params;

  if(!token){
    next(new AppError("Token is not exist",401))
  }

  let decoded = await jwt.verify(token,process.env.JWT_KEY)
  if(!decoded){
    next(new AppError("Invalid Token",401))
  }

  const user = await userModel.findOneAndUpdate({email:decoded.email,confirmed:false},{confirmed:true},{new:true})

  if(!user){
    next(new AppError("User is not exist or already confirmed",401))
  }
  res.status(200).json({message:"Verification done please log in"})
  
});

//Forget Password
const forgetPassword = catchAsyncError(async (req,res,next)=>{

  const {email} = req.body

  const user = await userModel.findOne({email})
  if(!user){
    next(new AppError("User is not exist",404))
  }

  let code = uuidv1(4)

  const hash = bcrypt.hashSync(code, 8)

  const token = jwt.sign({email:user.email,code},process.env.JWT_KEY,{expiresIn:60*3})

  const sentEmail = await sendEmail(
    {
      email,
      token,
    },
    token,
    req.protocol,
    req.headers.host,
    "resetPassword"

  );
  if (!sentEmail) {
    return next(new AppError("Email could not be sent", 500));
  }
  await userModel.updateOne({email},{code:hash})
  res.status(201).json({ message: "success please reset password"});
})

//resetPassword ---->DONE

const resetPassword = catchAsyncError(async (req, res, next) => {
  const {token} = req.params;
  const {newPassword}= req.body
  if(!token){
    return next(new AppError("Token is not exist",404))
  }

  const decoded = await jwt.verify(token,process.env.JWT_KEY)
  if(!decoded){
    return next(new AppError("Invalid token",401))
  }

  const user = await userModel.findOne({email:decoded.email})

  if(!user){
    return next(new AppError("User is not exist or already confirmed",404))
  }

  const match = bcrypt.compareSync(decoded.code,user.code)
  if(!match){
    return next(new AppError("Invalid token payload",404))
  }

  const hash = bcrypt.hashSync(newPassword,8)
  user.password = hash
  await user.save()
  res.status(201).json({message:"Reset Password Succesfully"})

}
  );


//Sign in ------> DONE

const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  console.log(user);

  if (!user || user.confirmed == false) {
    return next(new AppError("Invalid email or use is not confirmed yet", 401));
  }

  const match = bcrypt.compareSync(password,user.password)
  if(!match){
    return next(new AppError("Invalid password",401))
  }

  let result = await userModel.findOneAndUpdate(
    { _id: user._id },
    {
      isOnline: true,
    },
    { new: true }
  );
  let token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    "JR"
  );
  res.status(201).json({ message: "success", token, result });
});

//Get All Users

const getAllUsers = catchAsyncError(async (req, res, next) => {
  // Create a new instance of ApiFeatures
  const features = new ApiFeatures(userModel.find(), req.query);

  // Apply the desired API features
  features
    .pagination()
    .filteration()
    .sort()
    .search()
    .fields();

  // Execute the query
  const users = await features.mongooseQuery;

  if (!users || users.length === 0) {
    return next(new AppError('No users found', 404));
  }

  res.status(200).json({ message: 'success', users });
});


//Update User --> Account settings      ---> DONE

const updateUser = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;
  const { firstName, lastName } = req.body;
  let updatedUser = await userModel.findByIdAndUpdate(
    { _id },
    { firstName, lastName },
    { new: true }
  );

  if (updatedUser) {
    res.json({ Message: "User updated succesfully", updatedUser });
  } else {
    next(new AppError("Something went error in updtae", 500));
  }
});

//-logout ---->DONE

const logOut = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;

  let updateUser = await userModel.findOneAndUpdate(
    { _id },
    { isOnline: false },
    { new: true }
  );
  if (updateUser) {
    res.json({ Message: "User logout succesfuly", updateUser });
  } else {
    next(new AppError("User was not found", 404));
  }
});

export { signUp,confirmEmail, forgetPassword, signIn, getAllUsers,updateUser, resetPassword, logOut };
