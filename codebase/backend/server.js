require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const passport = require('passport');
const router = express.Router();
const jwtSecret = require('./jwtConfig').secret;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const API_PORT = process.env.API_PORT || 3000;
const BASE_URL = '/api';

app.use(cors({
	origin: 'http://localhost:8000',
}));

app.use(cors({
	origin: 'http://localhost:3000',
}));

app.listen(API_PORT, () => {
	console.log(`Listening on port ${API_PORT}`);
})


mongoose.connect(process.env.MONGO_URI).then(db => {
	const User = require('./models/User')(db);

	app.get(`${BASE_URL}`, (req, res) => {
		res.send("Hello, world!");
	});

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(router);

	// Initialize passport
	app.use(passport.initialize());

	// Initialize passport strategies
	const localStrategy = require('./middleware/localStrategy')(User, passport);

	// Login route with Passport
	app.post(`${BASE_URL}/user/authenticate`, (req, res, next) => {
		passport.authenticate('local-signin', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({
					message: 'Login failed.'
				});
			}
			const token = jwt.sign({
				email: user.email,
				id: user._id
			}, jwtSecret, {
				expiresIn: '1h'
			});

			return res.status(200).json({
				message: 'Login successful',
				token: token
			});
		})(req, res, next);
	});

	app.post(`${BASE_URL}/user/create`, (req, res, next) => {
		passport.authenticate('local-signup', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({
					message: info.message
				});
			}
			return res.status(200).json({
				message: 'Registration successful',
			});
		})(req, res, next);
	});
});
