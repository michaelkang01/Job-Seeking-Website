
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = mongoose => {
	const UserSchema = new mongoose.Schema({
		email: String,
		password: String,
		metadata: Array,
	}, { timestamps: true });
	UserSchema.methods.validPassword = async function (password) {
		const user = this;
		const compare = await bcrypt.compareSync(password, user.password);

		return compare;
	}
	return mongoose.model("User", UserSchema);
};
