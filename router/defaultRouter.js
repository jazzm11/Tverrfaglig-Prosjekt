const express = require('express');
const router = express.Router();

// Controller Import
const defaultController = require('../controller/defaultController');

// Default route
router.get('/', defaultController.visHjemmeside);
router.get('/faq', defaultController.visFaqSide);



module.exports = router;