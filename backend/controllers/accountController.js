const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const Client=require('../models/client');
// exports.getAccount = (req, res) => {
//   // Extract the token from the request headers
//   const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token format

//   // Verify and decode the token
//   jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Extract the client ID from the decoded token
//     const clientId = decoded.clientId;
//     console.log(clientId)

//     // Use the client ID to fetch the corresponding account details from the database
//     // Example database query using Mongoose (assuming MongoDB)
//     Account.findOne({ clientId })
//     .then(account => {
//         if (!account) {
//           return res.status(404).json({ message: 'Account not found' });
//         }
//         // Return the account details
//         res.status(200).json({ account });
//       })
//       .catch(err => {
//         console.error('Error fetching account:', err);
//         res.status(500).json({ message: 'Internal server error' });
//       });
//   });
// };

// controllers/accountController.js

// const Account = require('../models/account');

exports.getAccount = (req, res) => {
  const clientId = req.client.id; // Utilisez l'ID du client authentifié

  // Recherchez le compte du client dans la base de données en utilisant clientId
  Account.findOne({ ownerId: clientId })
    .then(account => {
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      // Retournez les détails du compte
      res.status(200).json({ account });
    })
    .catch(err => {
      console.error('Error fetching account:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

exports.getAccountsByClientId = (req, res) => {
  const clientId = req.params.clientId; // Get the client ID from request parameters

  // Find all accounts associated with the client in the database using clientId
  Account.find({ ownerId: clientId })
    .then(accounts => {
      if (!accounts || accounts.length === 0) {
        return res.status(404).json({ message: 'No accounts found for this client' });
      }
      // Return the list of accounts
      res.status(200).json({ accounts });
    })
    .catch(err => {
      console.error('Error fetching accounts:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};



exports.createAccountForClient = async (req, res) => {
  try {
    // Récupérer les données de la requête
    const { accountNumber, balance, ownerId } = req.body;

    // Vérifier si le client existe
    const client = await Client.findById(ownerId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Créer le nouveau compte
    const newAccount = new Account({
      accountNumber,
      balance,
      ownerId,
    });

    // Sauvegarder le nouveau compte dans la base de données
    await newAccount.save();

    // Ajouter le compte créé à la liste des comptes bancaires du client
    client.comptesBancaires.push(newAccount._id);
    await client.save();

    // Répondre avec le compte créé
    res.status(201).json({ message: 'Account created successfully', account: newAccount });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateAccount = (req, res) => {
  const accountId = req.params.accountId;

  Account.findByIdAndUpdate(accountId, req.body, { new: true })
      .then(updatedAccount => {
          if (!updatedAccount) {
              return res.status(404).json({ message: 'Account not found' });
          }
          res.status(200).json({ message: 'Account updated successfully', account: updatedAccount });
      })
      .catch(err => {
          console.error('Error updating account:', err);
          res.status(500).json({ message: 'Internal server error' });
      });
};