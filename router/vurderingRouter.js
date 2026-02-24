const express = require('express');
const router = express.Router();

// Controller Import
const vurderingController = require('../controller/vurderingController');

// GET Route
router.get('/opprett', vurderingController.visOpprettNettsted);
router.get('/nettsider', vurderingController.visNettsider);
router.get('/vurdering/:id', vurderingController.visVurderingSide);


// POST Route
router.post('/opprett', vurderingController.opprettNettsted);
router.post('/vurdering/:id/kommentar', vurderingController.lagreVurdering);


module.exports = router;