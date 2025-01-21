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
//apply cors validation for client and server verification
console.log(process.env.FRONTEND_URL)

const corsOptions ={
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173/"
    ], // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    // credentials: true, // Allow cookies if needed
  }

app.use(cors(corsOptions));

// This line of code enables your Express application to parse incoming JSON data in request bodies.
app.use(bodyParser.json());
app.use(express.json());

//Routing using /auth

app.get("/varad", async (req, res) => {
  console.log('server is running')
}); 
  
app.use("/auth", authRouter);

//server in listening in port no
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
