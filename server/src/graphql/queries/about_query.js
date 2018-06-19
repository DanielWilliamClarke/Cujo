
const aboutType = require("../types/about_type");
const getAboutResolver = require("../../models/about_model");

module.exports = {
  GetAbout: {
    description: "Get about block",
    type: aboutType,
    resolve: getAboutResolver
  }
};