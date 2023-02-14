const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    groupName: {
    type: String,
    require:true
  },
  groupIcon: {
    type: String,
    require:true
  },
  userId: {
    type:String
  }
}, { timestamps: true });

module.exports = mongoose.model("groups", Schema);
