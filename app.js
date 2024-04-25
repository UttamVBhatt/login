const express = require("express");

const app = express();

// Importing Middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Importing Routers
const userRouter = require("./routes/userRoute");

// Importing GlobalErrorHandler
const globalErrorHandler = require("./controllers/errorHandler");

// Using the Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Using the Routers
app.use("/api/v1/users", userRouter);

// Using the GlobalErrorHandler
app.use(globalErrorHandler);

module.exports = app;
