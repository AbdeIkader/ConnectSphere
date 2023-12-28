import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "./Database/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import { globalErrorHandling } from "./src/middleware/globalErrorHandling.js";
import postRouter from "./src/modules/posts/posts.routes.js";
import { AppError } from "./src/utils/AppError.js";
import commentRouter from "./src/modules/comments/comments.routes.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Endpoint was not found", 404));
});

app.use(globalErrorHandling);
dbConnection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
