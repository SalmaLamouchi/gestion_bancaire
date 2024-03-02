const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Client = require('../models/client');
const saltRounds = 12;
const Notification=require('../models/notification');

exports.loginAdmin =async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  }
  
  exports.logoutAdmin = (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logout successful' });
  };


  exports.isAuthenticated = async (req, res, next) => {
    try {
        // Vérifiez si l'en-tête Authorization est présent et commence par "Bearer"
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Extrait le token de l'en-tête Authorization
        const token = authHeader.split(' ')[1];

        // Vérifie et décode le token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Récupère l'ID de l'admin à partir du token décodé
        const adminId = decodedToken.id;

        // Recherche l'admin dans la base de données
        const admin = await Admin.findById(adminId);

        // Vérifie si l'admin existe
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Si l'admin est trouvé et valide, passe à l'étape suivante
        req.admin = admin;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized access' });
    }
};



exports.isAuthenticatedClient = async (req, res, next) => {
  try {
    // Check if the Authorization header is present and starts with "Bearer"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.CLIENT_SECRET);

    // Retrieve the ID of the client from the decoded token
    const clientId = decodedToken.id;

    // Search for the client in the database
    const client = await Client.findById(clientId);

    // Check if the client exists
    if (!client) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // If the client is found and valid, attach it to the request object and proceed
    req.client = client;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};
// changer admin password
exports.changeAdminPassword = (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // Rechercher l'admin dans la base de données par son adresse e-mail
  Admin.findOne({ email }).lean()
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ message: 'Admin non trouvé' });
      }

      // Vérifier si le mot de passe actuel est correct en le comparant avec le hash stocké dans la base de données
      if (!currentPassword || !admin.password) {
        return res.status(400).json({ message: 'Mot de passe manquant' });
      }

      return bcrypt.compare(currentPassword, admin.password);
    })
    .then(passwordsMatch => {
      if (!passwordsMatch) {
        return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
      }

      // Hacher le nouveau mot de passe et le stocker dans la base de données
      return bcrypt.hash(newPassword, 10);
    })
    .then(hash => {
      return Admin.updateOne({ email }, { password: hash });
    })
    .then(result => {
      return res.json({ message: 'Mot de passe modifié avec succès' });
    })
    .catch(err => {
      return res.status(500).json({ message: err.message });
    });
};

// client

exports.signupClient = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Check if user already exists with same email
    const client = await Client.findOne({ email });

    if (client) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);

    // Create new user object and save to database with estValide set to false
    const newUser = new Client({ nom, prenom, email, motDePasse: hashedPassword, estValide: false, estSuspendu:false });
    await newUser.save();

    // Get admin account and create a notification for the new client signup
    const admin = await Admin.findOne();
    const newNotification = new Notification({ 
      receiverId: admin._id,
      senderId: newUser._id,
      message: `${email} want to valid his account `
    });
    await newNotification.save();

    admin.notifications.push(newNotification);
    await admin.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



exports.loginClient = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Find user with given email
    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

     // Check if user is validated
     if (!user.estValide) {
      return res.status(401).json({ message: 'you are not authorized yet ' });
    }
    if (user.estSuspendu) {
      return res.status(401).json({ message: 'your account has been suspended by an administrator ! ' });
    }
    
    // Generate JWT token for user
    const token = jwt.sign({ id: user._id }, process.env.CLIENT_SECRET);
    // Return token and user data
    return res.status(200).json({ token, client: { clientId:user._id,nom: user.nom, prenom: user.prenom, email: user.email ,estValide: user.estValide ,estSuspendu:user.estSuspendu} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('userId');
  res.clearCookie('user');
  res.status(200).send({ message: 'Logout successful' });
};