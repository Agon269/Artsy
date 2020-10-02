// const User = require("../models/user");
// const apps = require("../APP/apps");
// const Art = require("../models/service");

// module.exports = (app) => {
//   //there should be two types of headers one for logged in and ..
//   app.get("/provider", async (req, res) => {
//     if (req.isAuthenticated()) {
//       const user = await apps.findOne(User, req.user.id);
//       if (user.provider == undefined || user.provider == null) {
//         //if the user doesnt have a service
//         res.redirect("please register service");
//       } else {
//         //find the users service and display
//         const service = await apps.findOne(Service, user.provider);
//         const { orders } = service;
//         res.send(orders);
//       }
//     } else {
//       res.redirect("/login");
//     }
//     //pass all services for display
//   });
// };
