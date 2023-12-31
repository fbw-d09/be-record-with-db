require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/User");
const Order = require("../models/Order");
const Record = require("../models/Record");

const db = mongoose
  .connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("something went wrong", err.message));

const purgeFakeData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Record.deleteMany();
  } catch (err) {
    console.log(err);
  }
  mongoose.connection.close();
};
purgeFakeData();
