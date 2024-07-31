// routes/presenceRoutes.js
const express = require('express');
const router = express.Router();
const presenceController = require('../controller/presence');

router.post('/presences', presenceController.createPresence);
router.get('/presences', presenceController.getPresences);
router.get('/presences/:id', presenceController.getPresenceById);
router.patch('/presences/:id', presenceController.updatePresence);
router.delete('/presences/:id', presenceController.deletePresence);

module.exports = router;
