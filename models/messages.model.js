const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  to: {
    type: String,
    require:true
  },
  content_type: {
    type: String,
  },
  destinationType: {
    type: String,
    require:true
  },
  messages:{
    type:Array,
  }
}, { timestamps: true });

module.exports = mongoose.model("messages", Schema);
