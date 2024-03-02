const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;

    // Vérifie si l'en-tête Authorization contient un token Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrait le token de l'en-tête Authorization
            token = req.headers.authorization.split(' ')[1];

            // Vérifie le token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Extrait l'ID de l'administrateur du token décodé
            const adminId = decoded.id;

            // Recherche l'administrateur dans la base de données par son ID
            req.admin = await Admin.findById(adminId).select('-motDePasse');

            // Vérifie si l'administrateur existe et est valide
            if (!req.admin) {
                res.status(401);
                throw new Error('Unauthorized access');
            }

            // Poursuit vers la prochaine étape de la middleware
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Unauthorized access');
        }
    }

    // Si aucun token n'est trouvé dans l'en-tête Authorization
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});




const protect = asyncHandler(async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
  
        // Verify token
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET)
  
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-motDePasse')
        console.log(req.user);
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  });

module.exports = { protectAdmin ,protect};
