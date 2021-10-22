module.exports = mongoose => {
	const ApplicationSchema = new mongoose.Schema({
          _id: String ,
		  listing_id: Number,
          firstName: String,
          lastName: String,
          email: String,
          city: String,
          province: String,
          zip: String,
	}, { timestamps: true });
	return mongoose.model("Application", ApplicationSchema);
};
