const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    groupName: {
    type: String,
    require:true
  },
  groupIcon: {
    type: String,
    require:true
  }
}, { timestamps: true });

module.exports = mongoose.model("groups", Schema);
