const express = require('express');
const router = express.Router();

// Controller Import
const vurderingController = require('../controller/vurderingController');

// GET Route
router.get('/opprett', vurderingController.visOpprettNettsted);
router.get('/nettsider', vurderingController.visNettsider);

// POST Route
router.post('/opprett', vurderingController.opprettNettsted);

module.exports = router;