const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    title: String,
    artist: String,
    year: Number,
    price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema, "records");
