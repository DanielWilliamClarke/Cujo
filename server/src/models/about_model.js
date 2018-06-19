var mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  about: {
    type: String,
    required: true
  }
});

const aboutModel = mongoose.model("about", aboutSchema)
const GetAbout = () => aboutModel.find();

module.exports = GetAbout;