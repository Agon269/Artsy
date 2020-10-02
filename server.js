require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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
require("./routes/order")(app);

//user details and edit
require("./routes/userhome")(app);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
