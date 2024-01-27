const mongoose = require("mongoose");

let { USER_NAME, PASSWORD, DATABASE_NAME } = process.env;

function dbConnection() {
  mongoose
    .connect(
      `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.sin2o64.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
      // "mongodb+srv://mernmuhaimen2202:Cxx45hFHHzG7t5Ir@cluster0.sin2o64.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then(() => console.log("database Connected!"));
}

module.exports = dbConnection;
