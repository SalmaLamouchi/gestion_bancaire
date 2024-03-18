import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
  account: Account = {
    _id: '', // Ajoutez l'identifiant (_id) du compte
    accountNumber: '',
    balance: 0,
    ownerId: ''
    // Ajoutez d'autres propriétés de compte au besoin
  };

  constructor(private accountService: ClientService, private router: Router) { }

  onSubmit(): void {
    // Récupérer l'ID du compte à mettre à jour à partir de localStorage
    const accountId = localStorage.getItem('accountId');

    if (accountId && accountId.trim() !== '') {
      // Appeler le service pour mettre à jour le compte
      this.accountService.updateAccount(accountId, this.account)
        .subscribe(
          (response) => {
            console.log('Account updated successfully:', response);
            this.router.navigate(['/accounts']); // Rediriger vers la liste des comptes après la mise à jour
          },
          (error) => {
            console.error('Error updating account:', error);
            // Gérer l'erreur ici
          }
        );
    } else {
      console.error('Account ID is missing or invalid.');
      // Gérer l'erreur ici
    }
  }
}
