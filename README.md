
# ConnectSphere

## Overview

ConnectSphere is a dynamic social media platform backend inspired by the concept of bringing people together in a shared virtual space. This project is built using Node.js, Express.js, and MongoDB, with a focus on RESTful API design. It features user authentication, post interactions, and real-time updates, mirroring the fast-paced connectivity of today's social media landscape.

Key functionalities include:
- **User Authentication**: Secure registration, login, and account management, complete with email verification and password reset functionalities.
- **Post Management**: Users can create, read, update, and delete posts, allowing for a rich interactive experience.
- **Comment System**: The platform supports commenting on posts, including nested replies, likes, and dislikes for engagement.
- **Real-time Interaction**: Features like post and comment updates are designed to provide a real-time experience for users.
- **Security**: Robust security measures including JWT for secure data transmission and bcrypt for password hashing.

The project structure emphasizes modularity and separation of concerns, ensuring each component of the backend is both scalable and maintainable.

## Technologies

- **Node.js**: The runtime environment for executing JavaScript on the server.
- **Express.js**: The web application framework for creating API endpoints.
- **MongoDB**: The NoSQL database for storing user and post data.
- **Mongoose**: The ODM for MongoDB to manage relationships between data and provide schema validation.
- **JSON Web Tokens (JWT)**: For secure transmission of information between the server and clients.
- **Bcrypt**: For hashing and securing user passwords.
- **Nodemailer**: For handling email sending within the app.
- **Multer**: For handling file uploads in Node.js.
- **Dotenv**: For managing environment variables.

## Configuration

### .env File
Create a `.env` file in the root directory with the following configurations (replace with your actual data):

```
PORT = 3000
MONGO_URL = mongodb://127.0.0.1:27017/Social-media
email = bigabdo69@gmail.com
emailpass = tschkvyrbpuawlru
JWT_KEY = JR
MODE = dev
BASE_URL = http://localhost:3000/
```

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

## Project Structure

The project follows a structured approach, organizing the codebase into logical modules:

```plaintext
ConnectSphere
│
├── Database
│   ├── models
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── comment.model.js
│   └── dbConnection.js
│
├── Email
│   ├── html.js
│   └── nodemailer.js
│
├── Src
│   ├── Middleware
│   │   ├── auth.js
│   │   ├── globalErrorHandling.js
│   │   └── validate.js
│   │
│   ├── Modules
│   │   ├── User
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   └── user.validation.js
│   │   │
│   │   ├── Post
│   │   │   ├── post.controller.js
│   │   │   ├── post.routes.js
│   │   │   └── post.validation.js
│   │   │
│   │   └── Comment
│   │       ├── comment.controller.js
│   │       ├── comment.routes.js
│   │       └── comment.validation.js
│   │
│   └── Utils
│       ├── apiFeatures.js
│       ├── appError.js
│       └── catchAsyncError.js
│
├── uploads
│   └── (User uploaded content)
│
├── .env (Environment configuration)
├── index.js (Entry point)
├── package.json (NPM dependencies and scripts)
└── README.md (Project documentation)
```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/AbdeIkader/ConnectSphere.git
   ```
2. Navigate to the project directory:
   ```
   cd ConnectSphere
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Configure the environment variables in `.env` based on the provided template.
5. Start the server:
   ```
   npm start
   ```

## API Documentation

Comprehensive API documentation is provided, detailing the available endpoints, their functionality, and usage examples.

## Contributing

Contributions are welcome. Please follow standard fork and pull request workflow.

## License

This project is licensed under the ISC License.

## Contact

- Email: [abdelrahmanabdelkader2002@gmail.com](mailto:abdelrahmanabdelkader2002@gmail.com)

