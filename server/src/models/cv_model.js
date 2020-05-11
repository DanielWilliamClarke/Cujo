var mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  cv: String
}, { collection: "data" });

const cvModel = mongoose.model("cv", cvSchema);
const GetCV = () => cvModel.findOne();

module.exports = GetCV;