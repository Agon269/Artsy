const User = require("../models/user");
const Services = require("../models/service");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

//need to get the service
module.exports = (app) => {
  //there should be two types of headers one for logged in and ..
  //need to check authentication
  app.get("/", async (req, res) => {
    const services = await apps.getAllDocs(Services);
    console.log(services);
    //pass all services for display
  });
};
