module.exports = mongoose => {
	const JoblistingSchema = new mongoose.Schema({
		listing_id: String, // uuid() is a string
		employer_id: String,
		job_description: String,
		job_location: String,
		job_title: String,
		date_posted: Date,
		contact_name: String,
		contact_title: String,
		contact_address: String,
		number_applied: Number,
		metadata: Array,
	}, { timestamps: true });
	return mongoose.model("Joblisting", JoblistingSchema);
};
