const mongoose = require('mongoose');
const { Schema } = mongoose; // Importez Schema à partir de mongoose
const validator = require('validator');
const bcrypt = require('bcrypt');
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

// ClientSchema.pre('save', async function (next) {
//     const client = this;
//     if (client.isModified('password') || client.isNew) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(client.motDePasse, salt);
//         client.motDePasse = hash;
//         next();
//       } catch (error) {
//         return next(error);
//       }
//     } else {
//       return next();
//     }
//   });
  ClientSchema.methods.comparePassword = async function (motDePasse) {
    try {
        const isMatch = await bcrypt.compare(motDePasse, this.motDePasse); // Compare password with hashed password stored in motDePasse
        return isMatch;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("Client", ClientSchema);

