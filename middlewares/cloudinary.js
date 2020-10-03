var cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: "dpvxp3lsz",
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDSECRET,
});

module.exports.uploadFile = uploadFile;
function uploadFile(file, options) {
  return new Promise(function (resolve) {
    cloudinary.uploader.upload(file, options, function (error, result) {
      if (error) {
        console.log("Not uploading");
        console.log(error);
        resolve({ bool: false, data: error });
      } else {
        console.log("Uploading");
        resolve({ bool: true, data: result });
      }
    });
  });
}
