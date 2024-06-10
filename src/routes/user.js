const express = require('express');

// Import the register and login functions from the authController module
const { register, login } = require('../controllers/authController');

// Create a new router object
const router = express.Router();

// Define a POST route for user registration
router.post('/register', register);

// Define a POST route for user login
router.post('/login', login);

module.exports = router;