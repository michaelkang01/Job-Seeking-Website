
module.exports = mongoose => {
	const JobseekerProfileSchema = new mongoose.Schema({
			username: String,
			email: String,
			skills: Array,
			address: String,
            full_name: String,
            metadata: Array
		}, { timestamps: true });
	return mongoose.model("JobseekerProfile", JobseekerProfileSchema);
};
