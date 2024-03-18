const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const authController = require('../controllers/authController');

router.get('/account/:clientId', authController.isAuthenticatedClient,accountController.getAccount);
router.post('/create-account',authController.isAuthenticated,accountController.createAccountForClient);
router.get('/get-acc/:clientId', authController.isAuthenticated, accountController.getAccountsByClientId);
router.put('/account/:accountId', authController.isAuthenticated, accountController.updateAccount);


module.exports = router;