const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();
const { protectAdmin,protect } = require('../middleware/auth.middleware');
const authController = require('../controllers/authController');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });



router.post('/clients/add',authController.isAuthenticated, protectAdmin,clientController.createClient);
router.get('/clients/',authController.isAuthenticated,protectAdmin,clientController.getAllClients);
router.get('/nonvalidclients/',authController.isAuthenticated, protectAdmin,clientController.getNonValidClients)
router.put('/suspend/:id',clientController.toggleSuspendAccount);
router.get('/clients/:id',authController.isAuthenticated, protectAdmin,clientController.getClientById);
router.delete('/clients/:id',authController.isAuthenticated, protectAdmin,clientController.deleteClient);

module.exports = router;