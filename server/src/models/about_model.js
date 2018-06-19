var mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  about: String
}, {collection: "cvData"});

module.exports = mongoose.model("about", aboutSchema);