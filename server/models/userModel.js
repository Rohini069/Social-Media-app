const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: { type: String, required: true },
  followings: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  followersList: [{ type: String, default: 0 }],
});
module.exports = mongoose.model("User", userSchema);
