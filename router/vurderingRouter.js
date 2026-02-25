const express = require('express');
const router = express.Router();

// Controller Import
const vurderingController = require('../controller/vurderingController');

// Middleware Import
const auth = require('../middleware/auth')

// GET Route
router.get('/opprett', auth.redirectIfLoggedOut, vurderingController.visOpprettNettsted);
router.get('/nettsider', vurderingController.visNettsider);
router.get('/nettsider/:id/slett', vurderingController.slettPoster);
router.get('/vurdering/:id', auth.redirectIfLoggedOut, vurderingController.visVurderingSide);


// POST Route
router.post('/opprett', vurderingController.opprettNettsted);
router.post('/vurdering/:id/kommentar', vurderingController.lagreVurdering);


module.exports = router;