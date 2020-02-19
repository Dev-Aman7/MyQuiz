var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

require("dotenv").config();
let db_url = process.env.url_mlab;
let connect = () => {
  //CONNECTING TO MONGODB ON START
  mongoose.connect(
    db_url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (err) {
        console.log(err);
        //process.exit(1);
      } else {
        console.log("Database ready to use.");
      }
    }
  );
  /////////
};

module.exports = {
  connect: connect
};
