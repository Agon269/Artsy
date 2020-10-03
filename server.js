require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const ejs = require("ejs");

const app = express();

// app.use(express.static(path.join(__dirname, "public")));

// app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//database connection
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connection.once("open", () => {
  console.log("connection established");
});

//user login and register routes
require("./routes/userauth")(app);

//service registration
require("./routes/uploadArt")(app);

//homepage
require("./routes/home")(app);

//provider home
// require("./routes/provider")(app);

//orderroute
require("./routes/purchase")(app);

//user details and edit
require("./routes/userhome")(app);

app.get("/user", (req, res) => {
  res.render("user");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
