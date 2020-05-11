
const cvType = require("../types/cv_type");
const getCVResolver = require("../../models/cv_model");

module.exports = {
  GetCV: {
    description: "cv json block",
    type: cvType,
    resolve: getCVResolver
  }
};