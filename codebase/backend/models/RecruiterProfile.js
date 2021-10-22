module.exports = mongoose => {
	const RecruiterProfileSchema = new mongoose.Schema({
		user: {type: Schema.Types.ObjectId, ref: 'User'},
		email: String,
		firstName: String,
		lastName: String,
		companyName: String,
		jobsPosted: [String],
		metadata: Array,
	}, { timestamps: true });
	return mongoose.model("RecruiterProfile", RecruiterProfileSchema);
};
