const express = require('express');
const router = express.Router();
const { testPrompt } = require('../controllers/openaiController');
const authenticate = require('../middlewares/authenticate');
const isAdmin = require('../middlewares/isAdmin');

router.post('/prompt', authenticate, isAdmin, testPrompt);

module.exports = router;
