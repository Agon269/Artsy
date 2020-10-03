const User = require("../models/user");
const Art = require("../models/art");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

//need to get the service
module.exports = (app) => {
  //there should be two types of headers one for logged in and ..
  //need to check authentication
  app.get("/", async (req, res) => {
    const arts = await apps.getAllDocs(Art);

    if (req.isAuthenticated()) {
      let homeInfo = {
        userActive: true,
        userData: req.user,
        data: arts,
      };
      res.render("home", homeInfo);
    } else {
      let homeInfo = {
        userActive: false,
        data: arts,
      };
      res.render("home", homeInfo);
    }

    //pass all services for display
  });
};
