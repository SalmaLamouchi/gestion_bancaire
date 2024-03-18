// transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transasctionController');
const authController = require('../controllers/authController');

router.post('/virement', transactionController.effectuerVirement);
router.get('/tran/:clientId', transactionController.getTransactionsByClient);

module.exports = router;
