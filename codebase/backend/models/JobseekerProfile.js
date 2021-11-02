module.exports = (mongoose) => {
  const JobseekerProfileSchema = new mongoose.Schema(
    {
      // https://mongoosejs.com/docs/populate.html
      user: { type: Schema.Types.ObjectId, ref: "User" },
      profile_picture: String,
      email: String,
      firstName: String,
      lastName: String,
      socials: [String],
      resumeUrl: String,
      summary: String,
      address: String,
      workExperience: [
        {
          title: String,
          start: String,
          end: String,
          location: String,
          description: String,
        },
      ],
      education: [
        { schoolName: String, start: String, end: String, location: String },
      ],
      skills: [String],
      metadata: Array,
    },
    { timestamps: true }
  );
  return mongoose.model("JobseekerProfile", JobseekerProfileSchema);

};

