/** EXTERNAL DEPENDENCIES */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

/** IMPORTS */
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const { setCors } = require("./middlewares/cors");

/** VARIABLES */
const port = process.env.PORT || 8000;
const app = express();

/**CONNECT TO DB */
const db = mongoose
  .connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("something went wrong", err.message));

/** MIDDLEWARE */
// external middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  own middleware
app.use(setCors);

/** ROUTES */
app.use("/users", usersRouter);
app.use("/records", recordsRouter);

/** ERROR HANDLING */
app.use((req, res, next) => {
  const error = new Error("Looks like something broke...");
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: {
      message: err.message,
    },
  });
});

/** LISTENER */
app.listen(port, () => {
  console.log(`server is listenig on ${port} ...🐒`);
});
