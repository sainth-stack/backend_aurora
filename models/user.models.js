const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
status:{
  type:Boolean,
  default:false,
}
}, { timestamps: true });

module.exports = mongoose.model("users", Schema);
