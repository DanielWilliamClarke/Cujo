var mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  about: String
}, {collection: "cvData"});

const aboutModel = mongoose.model("about", aboutSchema);
const GetAbout = () => aboutModel.findOne();

module.exports = GetAbout;