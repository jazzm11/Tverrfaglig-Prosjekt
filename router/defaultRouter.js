const express = require('express');
const router = express.Router();

// Controller Import
const defaultController = require('../controller/defaultController');

// Default route
router.get('/', defaultController.visHjemmeside);

module.exports = router;