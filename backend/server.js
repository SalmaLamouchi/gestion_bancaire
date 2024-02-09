// server.js

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
const path=require('path');
const http= require('http');
userRoutes= require('./routes/userRoutes');
// Connectez-vous à MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/gestion-bancaire', {
// mongoose.connect('mongodb://127.0.0.1:27017/myappdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Middleware pour traiter les données JSON
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);
app.use('/users', userRoutes);
// Écoutez le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
