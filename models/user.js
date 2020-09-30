const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
// const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 6,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  provider: String,
  ordered: [],
});

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

const User = new mongoose.model("Users", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = User;
