//import all required dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const mongodb = require("./models/db");
const authRouter = require("./Routes/AuthRouter");
require('dotenv').config();


//database connectivity using calling mongodb veriable
mongodb;

//apply cors validation for client and server verification
app.options('*', cors());
app.use(
  cors({
    origin: [
        process.env.FRONTEND_URL,
        process.env.FRONTEND_URL2,
    ], // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
  })
);


// This line of code enables your Express application to parse incoming JSON data in request bodies.it is Generally use in middleware
app.use(bodyParser.json());
app.use(express.json());


//GET Request for Trial
app.get("/varad", async (req, res) => {
  res.send('server is running')
}); 

//Routing using /auth
app.use("/auth", authRouter);

//server in listening in port no
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
