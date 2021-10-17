module.exports = mongoose => {
	const RecruiterProfileSchema = new mongoose.Schema({
		email: String,firstName: String,
		lastName: String,
		companyName: String,
		jobsPosted: [{ type: Schema.Types.ObjectId }],
		metadata: Array,
	}, { timestamps: true });
	return mongoose.model("RecruiterProfile", RecruiterProfileSchema);
};