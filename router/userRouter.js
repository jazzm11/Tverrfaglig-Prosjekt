const express = require('express');
const router = express.Router();

// Controller Import
const userController = require('../controller/userController');

// GET Route
router.get('/login', userController.visLoginside);
router.get('/register', userController.visRegistreringsside);

// POST Route
router.post('/login', userController.loginPost);
router.post('/register', userController.registerPost);

module.exports = router;