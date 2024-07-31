const router = require('express').Router();
const Employee = require('../model/emp_schema');
const User = require('../model/schema');
const controller = require('../controller/controller');
const auth = require('../middleware/auth')
const services = require('../services/services');
const db = require("../database/connection");
console.log("in router");
router.post('/register', controller.registerUser);
router.post('/login', controller.login);
router.delete('/delete', auth, controller.delete);

 
router.post('/users', controller.create);
router.get('/users', controller.find);
router.get('/users/:id', controller.findById);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete);

 
module.exports = router;



 