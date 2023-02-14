const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
groupid:{
  type:Array,
  default:false,
}
}, { timestamps: true });

module.exports = mongoose.model("userstogrps", Schema);
