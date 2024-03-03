const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const authController = require('../controllers/authController');

router.get('/account/:clientId', authController.isAuthenticatedClient,accountController.getAccount);
router.post('/create-account',authController.isAuthenticated,accountController.createAccountForClient)


module.exports = router;