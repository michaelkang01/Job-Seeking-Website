
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = mongoose => {
	const UserSchema = new mongoose.Schema({
		email: String,
		password: String,
		metadata: Array,
	}, { timestamps: true });
	return mongoose.model("User", UserSchema);
};
