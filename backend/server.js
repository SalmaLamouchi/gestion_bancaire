// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const http= require('http');
const cors = require('cors');
// Middleware pour parser le corps des requêtes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

clientRoutes= require('./routes/clientRoutes');
// Connectez-vous à MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/gestion-bancaire', {
// mongoose.connect('mongodb://127.0.0.1:27017/myappdb', {
 
// useNewUrlParser: true,
// useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to database:', error);
});

db.once('open', () => {
  console.log('Connected to database');
});








// Middleware pour traiter les données JSON
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);
app.use('/admin', clientRoutes);
// Écoutez le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
