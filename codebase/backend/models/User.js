
module.exports = mongoose => {
	const UserSchema = new mongoose.Schema({
			username: String,
			email: String,
			hashed_password: String,
			salt: String,
			metadata: Array,
		}, { timestamps: true });
	return mongoose.model("User", UserSchema);
};
