require('dotenv').config();

const express = require('express');
const app = express();

const FRONTEND_PORT = process.env.FRONTEND_PORT || 8000;

app.use(express.static("build"));

app.listen(FRONTEND_PORT, () => {
	console.log(`Serving on port ${FRONTEND_PORT}`);
})
