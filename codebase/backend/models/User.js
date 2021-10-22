const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Schema } = require("mongoose");

// mongo db refs
// original_id = ObjectId()
// db.users.insert({"_id": original_id, "email": ...})
// db.jobseekerprofiles.insert({"userID": original_id, ...})

module.exports = (mongoose) => {
  const UserSchema = new mongoose.Schema(
    {
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      role: String,
      metadata: Array,
    },
    { timestamps: true }
  );
  return mongoose.model("User", UserSchema);
};
