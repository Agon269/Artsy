const Art = require("../models/art");
const User = require("../models/user");
const fileUpload = require("express-fileupload");
const uploader = require("../middlewares/cloudinary");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

module.exports = (app) => {
  app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
  app.post("/uploadart", async (req, res) => {
    if (req.isAuthenticated()) {
      //image upload and link
      let pack = {
        folder: "arts/",
      };

      var first = req.files.img1;
      var path1 = first.tempFilePath;
      const ret1 = await uploader.uploadFile(path1, pack);
      var imgOne = ret1.data.url;

      var second = req.files.img2;
      var path2 = second.tempFilePath;
      const ret2 = await uploader.uploadFile(path2, pack);
      var imgSec = ret2.data.url;

      var third = req.files.img3;
      var path3 = third.tempFilePath;
      const ret3 = await uploader.uploadFile(path3, pack);
      var imgThird = ret3.data.url;

      const art = new Art({
        name: req.body.name,
        description: req.body.description,
        Adress: {
          address1: req.body.address1,
        },
        price: req.body.price,
        artist: req.body.painter,
        img1: imgOne,
        img2: imgSec,
        img3: imgThird,
        owner: req.user._id,
      });

      art.save({ art }, (err, serv) => {
        if (err) {
          console.log(err);
        } else {
          //attach to user
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $push: { arts: art.id } },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                //route to the providers home
                res.redirect("/");
              }
            }
          );
        }
      });
    } else {
      res.redirect("sigin");
    }
  });

  app.get("/uploadart", (req, res) => {
    if (req.isAuthenticated()) {
      let uploadInfo = {
        userActive: true,
        userData: req.user,
      };
      res.render("uploadart", uploadInfo);
    } else {
      let uploadInfo = {
        userActive: false,
      };
      res.redirect("signin", uploadInfo);
    }
  });
};
