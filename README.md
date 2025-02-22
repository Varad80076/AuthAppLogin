# Authentication Web App (MERN)

This project is a full-stack web application for user authentication built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- User Registration
- User Login and Logout
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Responsive UI

## Tech Stack

- **Frontend**: React.js, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/auth-webapp-mern.git
   cd auth-webapp-mern
   ```

2. Install dependencies for the backend:

   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:

   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the `backend` folder and add the following:

   ```env 
   PORT=4000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```
.
├── backend
│   ├── config
│   │   └── db.js       # MongoDB connection setup
│   ├── controllers
│   │   └── userController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   └── User.js     # User schema
│   ├── routes
│   │   └── userRoutes.js
│   ├── server.js       # Entry point for backend
│   └── .env
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles
│   │       └── App.css
│   └── public
└── README.md
```
<a href="https://tinyurl.com/auth-application" target="_blank">
    <img alt="Authentication-App" height="25" alt="Authentication-App" src="https://img.shields.io/badge/Visit%20Application-blue?style=for-the-badge bg-gradient-to-r from-blue-500 to-purple-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300"/>
  </a>

## Contributing

Contributions are welcome! Please fork this repository and create a pull request for any improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
