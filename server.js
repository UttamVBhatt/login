const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    dbName: "Login",
  })
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));

const server = app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
