const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();
const {protect } = require('../middleware/auth.middleware');
const authController = require('../controllers/authController');


router.get('/profile/:clientId', authController.isAuthenticatedClient,clientController.getProfile);
router.put('/profile/:id',authController.isAuthenticated, protectAdmin,clientController.updateProfile);
module.exports = router;