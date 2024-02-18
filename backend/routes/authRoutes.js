const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');





router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);
router.post('/password', authController.changeAdminPassword);
router.post('/signup', authController.signupClient);
// router.post('/loginct', authController.loginClient);
// router.post('/logoutuser', authController.logoutUser);

module.exports = router;