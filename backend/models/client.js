const mongoose = require('mongoose');
const { Schema } = mongoose; // Importez Schema à partir de mongoose
const validator = require('validator');
const ClientSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, 'please provide a valid email'],
    },
    motDePasse: { type: String, required: true, minlength: 8 },
    telephone: { type: String, required: false },
    adresse: { type: String, required: false },
    photo: { type: String, required: false },
    estValide: { type: Boolean, default: false },
    estSuspendu: { type: Boolean, default: false },
    comptesBancaires: [{ type: Schema.Types.ObjectId, ref: 'Account' }] // Utilisez un tableau pour représenter plusieurs comptes bancaires
});

module.exports = mongoose.model("Client", ClientSchema);

