const express = require('express');

const { startGame } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

// Create a new router object
const router = express.Router();

// Define a POST route to start game
router.post('/start', protect, startGame);

module.exports = router;