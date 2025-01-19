//import all required dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const mongodb = require("./models/db");
const authRouter = require("./Routes/AuthRouter");
require("dotenv").config();

//database connectivity using calling mongodb veriable
mongodb;
app.options('*', cors());
//apply cors validation for client and server verification
app.use(
  cors({
    origin: ["https://auth-app-sepia-pi.vercel.app/",
      "https://auth-app-sepia-pi.vercel.app/login",
      "https://auth-app-sepia-pi.vercel.app",
    ], // Frontend URL
    methods: ["GET", "POST", 'OPTIONS', "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
    mode: "no-cors",
  })
);


// This line of code enables your Express application to parse incoming JSON data in request bodies.it is Generally use in middleware
app.use(bodyParser.json());
app.use(express.json());

//Routing using /auth
app.use("/auth", authRouter);

//server in listening in port no
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
