//Import Packages
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");



//Import The Function Files
const { startMongooseServer } = require("./functions");

//Import The Router Files
const authRouter = require("./Routes/auth.route");
const app = express();

app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

//Connect to MongoDB
startMongooseServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}/`);
});

app.use("/auth", authRouter);
