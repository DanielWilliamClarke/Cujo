
const aboutType = require("../types/about_type");
const aboutModel = require("../../models/about_model");

module.exports = {
  GetAbout: {
    description: "Get about block",
    type: aboutType,
    resolve: () => aboutModel.findOne() 
  }
};