require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const passport = require('passport');
const router = express.Router();
const jwtSecret = require('./jwtConfig').secret;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const API_PORT = process.env.API_PORT || 3000;
const BASE_URL = '/api';

// Handle CORS
const cors = require('cors');

app.use(cors({
	origin: 'http://localhost:8000',
}));

app.use(cors({
	origin: 'http://localhost:3000',
}));

// Set up Express to listen on API_PORT
app.listen(API_PORT, () => {
	console.log(`Listening on port ${API_PORT}`);
})

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI).then(db => {
	const User = require('./models/User')(db);

	app.get(`${BASE_URL}`, (req, res) => {
		res.send("Hello, world!");
	});

	// Setup body-parser middleware
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Setup Router
	app.use(router);

	// Initialize passport
	app.use(passport.initialize());

	// Initialize passport strategies
	require('./middleware/localStrategy')(User, passport);

	// Verify JWT endpoint
	app.get(`${BASE_URL}/user/verify_header`, (req, res, next) => {
		const token = req.headers.authorization;
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({ "status": "Unauthorized" });
			} else {
				res.status(200).json({ "status": "Authorized", "data": decoded });
			}
		});
	})

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
				id: user._id,
				metadata: user.metadata
			}, jwtSecret, {
				expiresIn: '1h'
			});

			return res.status(200).json({
				message: 'Login successful',
				token: token,
				authData: jwt.decode(token, { json: true, complete: true })
			});
		})(req, res, next);
	});

	app.post(`${BASE_URL}/user/create`, (req, res, next) => {
		passport.authenticate('local-signup', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(409).json({
					message: info.message
				});
			}
			return res.status(200).json({
				message: 'Registration successful',
			});
		})(req, res, next);
	});
});
