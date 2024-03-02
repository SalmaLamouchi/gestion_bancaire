export interface Transaction {
    sender: string; // ID du compte expéditeur
    receiver: string; // ID du compte destinataire
    amount: number; // Montant de la transaction
    type: string; // Type de transaction (retrait, dépôt, etc.)
    status: string; // Statut de la transaction (en attente, réussie, échouée, etc.)
    date: Date; // Date de la transaction
  }
  