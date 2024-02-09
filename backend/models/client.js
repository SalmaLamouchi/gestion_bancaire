const mongoose = require("mongoose");
saltRounds=12;
const validator = require('validator');

const ClientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate:[validator.isEmail,'please provide a valid email'],
  
    },
    motDePasse: {
      type: String,
      required: true,
      minlength:8
    },
    telephone: { type: String, required: false },
    adresse: { type: String, required: false },
    photo: { type: String, required: false },
    estValide: { type: Boolean, default: false },
    estSuspendu: { type: Boolean, default: false }
});
  
  module.exports = mongoose.model("Client", ClientSchema);
  




