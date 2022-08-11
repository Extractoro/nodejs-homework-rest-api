const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT);
    console.log(`Database connection successful on port: ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
