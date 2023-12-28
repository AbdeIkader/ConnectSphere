
# ConnectSphere

## Introduction

This repository hosts the backend code for a social media platform. It is designed with Node.js and Express and uses MongoDB as a database. The system is robust and allows for user interactions such as posting, commenting, and reacting to content.

## Features

- User Authentication (Sign Up, Sign In)
- Email Confirmation
- Password Reset
- CRUD operations for Posts
- CRUD operations for Comments
- Like/Dislike functionality for Posts and Comments
- Search, Pagination, and Sorting

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for Authentication
- Bcrypt for Password Hashing
- Nodemailer for Email Services
- Multer for File Uploads
- Dotenv for Environment Variables

## Getting Started

Clone the repository and install the dependencies:

\```bash
git clone https://github.com/yourusername/social-media-exam.git
cd social-media-exam
npm install
\```

Create a `.env` file and populate it with your environment variables:

\```env
PORT=3001
DB_CONNECTION_STRING=<your_mongodb_connection_string>
JWT_KEY=<your_jwt_secret_key>
email=<your_email@gmail.com>
emailpass=<your_email_password>
BASE_URL=http://localhost:3001/
\```

## Running the Server

To start the server, run:

\```bash
npm start
\```

The server will start on the configured port, defaulting to `http://localhost:3001`.

## API Endpoints

### User Management

- `POST /user/sign-up` - Registers a new user.
- `GET /user/confirmEmail/:token` - Confirms the user's email.
- `PATCH /user/forgetPassword` - Initiates a password reset process.
- `PATCH /user/resetPassword/:token` - Allows setting a new password.
- `POST /user/sign-in` - Authenticates a user.
- `GET /user/getAllUsers` - Retrieves a list of all users.
- `PUT /user/updateUser` - Updates user information.
- `PATCH /user/logout` - Logs out the user.

### Post Management

- `POST /post/createPost` - Creates a new post.
- `GET /post/getAllPosts` - Retrieves all posts.
- `GET /post/getAllPostsForSpecificUser` - Retrieves all posts for a specific user.
- `GET /post/getDetailsOfSpecificPost/:_id` - Retrieves details for a specific post.
- `PUT /post/updateSpecifcPost/:_id` - Updates a specific post.
- `DELETE /post/deleteSpecificPost/:_id` - Deletes a specific post.
- `PATCH /post/addLikeToPost/:_id` - Adds a like to a post.
- `PATCH /post/addDisLikeToPost/:_id` - Adds a dislike to a post.

### Comment Management

- `POST /comment/createComment/:postId` - Adds a comment to a post.
- `PATCH /comment/updateComment/:commentId` - Updates a comment.
- `DELETE /comment/deleteComment/:commentId` - Deletes a comment.
- `PATCH /comment/addLikeToComment/:commentId` - Adds a like to a comment.
- `PATCH /comment/addDisLikeToComment/:commentId` - Adds a dislike to a comment.
- `POST /comment/addReplyToComment/:commentId` - Adds a reply to a comment.

## Contributions

Contributions are welcome! Please fork the repository and open a pull request with your changes.

## License

This project is open-sourced under the ISC License.
