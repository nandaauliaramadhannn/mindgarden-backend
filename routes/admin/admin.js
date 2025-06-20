const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const controller = require('../controllers/adminController');

router.use(auth.authenticate, isAdmin);

router.get('/users', controller.getAllUsers);
router.get('/users/:id', controller.getUserById);
router.patch('/users/:id/ban', controller.banUser);
router.get('/subscriptions', controller.getAllSubscriptions);

module.exports = router;
