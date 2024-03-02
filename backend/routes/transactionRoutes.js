// transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transasctionController');

router.post('/virement', transactionController.effectuerVirement);

module.exports = router;
