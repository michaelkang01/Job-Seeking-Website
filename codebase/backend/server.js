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
	origin: `${process.env.BASE_URL}:${process.env.FRONTEND_PORT}`,
}));

// Set up Express to listen on API_PORT
app.listen(API_PORT, () => {
	console.log(`Listening on port ${API_PORT}`);
})

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI).then(db => {
	const User = require('./models/User')(db);

	/**
	 * Signs JWT and returns it
	 * 
	 * @param UserSchema user 
	 * @returns JWT String
	 */
	const signJwt = (user) => {
		const token = jwt.sign({
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
			id: user._id,
			metadata: user.metadata
		}, jwtSecret, {
			expiresIn: '3h'
		});
		return token;
	}

	app.get(`${BASE_URL}`, (req, res) => {
		res.send("EasyApply API");
	});

	// Setup body-parser middleware
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	const verifyUser = (req, res, next) => {
		const token = req.headers.authorization;
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({ "status": "Unauthorized" });
			} else {
				res.locals.authData = decoded;
				next();
			}
		});
	};

	// Initialize passport
	app.use(passport.initialize());

	// Initialize passport strategies
	require('./middleware/localStrategy')(User, passport);
	require('./middleware/googleStrategy')(User, passport);

	// Setup Router
	app.use(`${BASE_URL}`, router);

	// Verify JWT endpoint
	router.get(`/user/verify_header`, verifyUser, (req, res, next) => {
		const decoded = res.locals.authData;
		res.status(200).json({ "status": "Authorized", "data": decoded });
	})

	// Google OAuth2 endpoint callback
	router.get(`/user/auth/google_callback`, (req, res, next) => {
		passport.authenticate('google-login', { session: false }, (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				res.redirect(`${process.env.BASE_URL}:${process.env.FRONTEND_PORT}/signin`);
			} else {
				const token = signJwt(user);
				const returnData = Buffer.from(JSON.stringify({
					token: token,
					authData: jwt.decode(token, { json: true, complete: true })
				})).toString('base64');
				res.redirect(`${process.env.BASE_URL}:${process.env.FRONTEND_PORT}/signin/callback/?d=${returnData}`);
			}
		})(req, res, next);
	});

	router.get(`/user/auth/google`,
		passport.authenticate('google-login', {
			scope:
				['email', 'profile']
		})
	);

	// Login route with Passport
	router.post(`/user/authenticate`, (req, res, next) => {
		passport.authenticate('local-signin', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({
					message: 'Login failed.'
				});
			}
			const token = signJwt(user);

			return res.status(200).json({
				message: 'Login successful',
				token: token,
				authData: jwt.decode(token, { json: true, complete: true })
			});
		})(req, res, next);
	});

	router.post(`/user/create`, (req, res, next) => {
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

	router.delete(`/user/delete`, verifyUser, (req, res, next) => {
		User.findById(res.locals.authData.id, (err, user) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(404).json({
					message: 'User not found. This probably means the user has already been deleted.'
				});
			}
			
			user.remove((err) => {
				if (err) {
					return next(err);
				}
			})

			return res.status(200).json({
				message: 'User deleted'
			});
		});
	});
});
