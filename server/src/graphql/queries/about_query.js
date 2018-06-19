
const aboutBlogType = require("../types/about_type");
const GetAbout = require("../../models/about_model");

module.exports = {
  GetAbout: {
    description: "Get about block",
    type: aboutBlogType,
    resolve: GetAbout
  }
};