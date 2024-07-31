const express = require('express');
const router = express.Router();
const congeController = require('../controller/conge');

router.post('/conges', congeController.createConge);
router.get('/conges', congeController.getConges);
router.get('/conges/:id', congeController.getCongeById);
router.patch('/conges/:id', congeController.updateConge);
router.delete('/conges/:id', congeController.deleteConge);
router.get('/conges/user/:userId', congeController.getCongesByUserId);
router.put('/conges/accepter/:id', congeController.accepterConge);
router.put('/conges/refuser/:id', congeController.refuserConge);

module.exports = router;
