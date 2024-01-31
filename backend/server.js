// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connectez-vous à MongoDB
mongoose.connect('mongodb://localhost:27017/nom_de_votre_base_de_données', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware pour traiter les données JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur la plateforme de gestion bancaire');
});

// Écoutez le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
