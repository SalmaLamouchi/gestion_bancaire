import { Account } from "./account";

export interface Client {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    telephone?: string;
    adresse?: string;
    photo?: string;
    estValide: boolean;
    estSuspendu: boolean;
    comptesBancaires: Account[]; // Tableau de comptes bancaires
  }