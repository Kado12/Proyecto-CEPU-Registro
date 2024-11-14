const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register.controller.js');

router.get('/register', registerController.getRegisters)
router.get('/register/:id', registerController.getRegisterById)
router.post('/register', registerController.createNewRegister)
router.put('/register/:id', registerController.updatedRegister)
router.delete('/register/:id', registerController.deletedRegister)

module.exports = router;