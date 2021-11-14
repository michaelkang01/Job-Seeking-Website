const { ObjectID } = require("bson");

module.exports = (mongoose) => {
  const RecruiterProfileSchema = new mongoose.Schema(
    {
      user: ObjectID,
      logo: String,
      email: String,
      phone: String,
      city: String,
      province: String,
      zip: String,
      companyName: String,
      jobsPosted: [String],
      metadata: Array,
    },
    { timestamps: true }
  );
  return mongoose.model("RecruiterProfile", RecruiterProfileSchema);
};
