// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
// const http= require('http');
const Admin =require('./models/admin');
const authRoutes=require('./routes/authRoutes');
clientRoutes= require('./routes/clientRoutes');
transactionRoutes=require('./routes/transactionRoutes');
profilRoutes=require('./routes/profilRoutes');
accRoutes=require('./routes/accountRoutes');
const notificationRoute=require('./routes/notificationRoutes');

const cors = require('cors');
// Middleware pour parser le corps des requêtes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connectez-vous à MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/gestion-bancaire', {
// mongoose.connect('mongodb://127.0.0.1:27017/gestion-bancaire', {
 
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




// creation d'un admin 
//   async function seed() {
//    const email = 'salmakk@gmail.com';
//    const password = 'salma123';
//    const admin = new Admin({ email, password });
//    await admin.save();
//   console.log('Admin created:', admin);
//   mongoose.connection.close();
//  }
//  seed(); 



// Middleware pour traiter les données JSON

// Routes
// app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', clientRoutes,notificationRoute);
app.use('/transaction', transactionRoutes);
app.use('/client', profilRoutes);
app.use('/acc',accRoutes);
app.use(express.json());

// Écoutez le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
