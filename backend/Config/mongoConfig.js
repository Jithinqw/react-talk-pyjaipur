/**
* @fileoverview mongoDB configuration
*/
const mongoose = require("mongoose"),
    chalk = require("chalk");
    MONGOURL = "mongodb://127.0.0.1/tododemo";

function Connection(){
  mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on("error", (err)=>{
    console.log(err);
    console.log("%s Unable to connect to MongoDB", chalk.red("✗"));
    process.exit();
  });
}

module.exports = {
  connect: Connection,
  mongoUrl: MONGOURL
}