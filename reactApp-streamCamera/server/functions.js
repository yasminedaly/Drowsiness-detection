//Import Packages
const mongoose = require("mongoose");
require("dotenv").config();

//Import the Secret Variables
const MongoDB_URI = process.env.MongoDB_URI;

const startMongooseServer = () => {
  mongoose.connect(MongoDB_URI, { useNewUrlParser: true }, (err) => {
    if (err) return console.log("Error connecting to MongoDB");

    let ModelsName = [];
    console.log("Connected to MongoDB");

    for (var ModelName in mongoose.connection.models)
      ModelsName.push(ModelName);

    console.table(ModelsName);
  });
};
module.exports = {
  startMongooseServer,
};
