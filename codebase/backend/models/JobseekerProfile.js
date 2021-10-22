module.exports = mongoose => {
	const JobseekerProfileSchema = new mongoose.Schema({
			email: String,
			firstName: String,
			lastName: String,
            githubID: String,
            facebookID: String,
			resumeUrl: String,
			summary: String,
			address: String,
			workExperience: Object,
			education: Object,
			skills: Array,
			metadata: Array,
			jobsApplied:Array,
		}, { timestamps: true });
	return mongoose.model("JobseekerProfile", JobseekerProfileSchema);
};
