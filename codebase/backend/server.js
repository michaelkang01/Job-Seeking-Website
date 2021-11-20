require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const API_PORT = process.env.API_PORT || 3000;

app.use(cors({
    origin: 'http://localhost:8000',
}));

app.listen(API_PORT, () => {
	console.log(`Listening on port ${API_PORT}`);
})

mongoose.connect(process.env.MONGO_URI).then(db => {
	const User = require('./models/User')(db);
	app.get("/", (req, res) => {
		res.send("Hello, world!");
	});
	app.get("/users", (req, res) => {
		User.find().then(ret => {
			res.json(ret);
		});
	});
	app.get("/create_test_user", (req, res) => {
		let user_object = {
			"username": "test_user_" + Math.random().toString(36).substr(7),
			"hashed_password": "none",
			"salt": "none",
			"email": "none@ex.com",
			"metadata": [
			]
		};
		const new_user = new User(user_object);
		new_user.save((err, user) => {
			if (err) {
				res.send(err);
			} else {
				res.json(user);
			}
		});
	});
	app.post("/remove_all_users", (req, res) => {
		User.remove({}, (err, ret) => {
			if (err) {
				res.send(err);
			} else {
				res.json(ret);
			}
		});
	});
});
