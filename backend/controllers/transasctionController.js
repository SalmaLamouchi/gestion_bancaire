const Account = require('../models/account');
const Transaction = require('../models/transaction');

// Fonction pour effectuer un virement
async function effectuerVirement(compteSourceId, compteDestinationId, montant) {
    try {
        // Vérifier que les comptes source et destination existent dans la base de données
        const compteSource = await Account.findById(compteSourceId);
        const compteDestination = await Account.findById(compteDestinationId);

        if (!compteSource || !compteDestination) {
            throw new Error('Compte source ou destination invalide');
        }

        // Vérifier que le solde du compte source est suffisant pour effectuer le virement
        if (compteSource.balance < montant) {
            throw new Error('Fonds insuffisants');
        }

        // Créer une nouvelle transaction
        const nouvelleTransaction = new Transaction({
            sender: compteSourceId,
            receiver: compteDestinationId,
            amount: montant,
            type: 'withdrawal', // Le montant est retiré du compte source
            status: 'pending', // Statut initial de la transaction
            date: new Date()
        });

        // Enregistrer la transaction dans la base de données
        await nouvelleTransaction.save();

        // Mettre à jour les soldes des comptes source et destination
        compteSource.balance -= montant;
        compteDestination.balance += montant;
        await compteSource.save();
        await compteDestination.save();

        return nouvelleTransaction; // Retourner la transaction créée
    } catch (error) {
        console.error('Erreur lors de l\'exécution du virement :', error);
        throw error; // Propager l'erreur pour être gérée plus haut dans l'application
    }
}

exports.effectuerVirement = async (req, res) => {
    try {
        const { compteSourceId, compteDestinationId, montant } = req.body;

        // Vérifier que tous les champs requis sont fournis
        if (!compteSourceId || !compteDestinationId || !montant) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Effectuer le virement en utilisant la fonction effectuerVirement()
        const nouvelleTransaction = await effectuerVirement(compteSourceId, compteDestinationId, montant);

        // Envoyer une réponse avec la transaction créée
        return res.status(200).json({ transaction: nouvelleTransaction });
    } catch (error) {
        console.error('Erreur lors de l\'exécution du virement :', error);
        return res.status(500).json({ message: 'Erreur lors de l\'exécution du virement' });
    }
};


// Fonction pour obtenir les transactions d'un client
async function getTransactionsByClient(clientId) {
    try {
        // Recherchez les transactions où le client est l'expéditeur ou le destinataire
        const transactions = await Transaction.find({ $or: [{ sender: clientId }, { receiver: clientId }] });
        return transactions;
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions du client :', error);
        throw error;
    }
}

// Contrôleur pour récupérer les transactions d'un client
exports.getTransactionsByClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;

        // Vérifiez si l'ID du client est fourni
        if (!clientId) {
            return res.status(400).json({ message: 'L\'ID du client est requis' });
        }

        // Appelez la fonction pour obtenir les transactions du client
        const transactions = await getTransactionsByClient(clientId);

        // Envoyez la réponse avec les transactions trouvées
        return res.status(200).json({ transactions });
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions du client :', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des transactions du client' });
    }
};