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
<a href="https://tinyurl.com/auth-application" target="_blank" style="
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
" onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 8px 20px rgba(0, 0, 0, 0.3)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 15px rgba(0, 0, 0, 0.2)'">
  Visit Application
</a>



## Contributing

Contributions are welcome! Please fork this repository and create a pull request for any improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
