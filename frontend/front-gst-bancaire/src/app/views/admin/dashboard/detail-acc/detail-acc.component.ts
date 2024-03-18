import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-detail-acc',
  templateUrl: './detail-acc.component.html',
  styleUrls: ['./detail-acc.component.css']
})
export class DetailAccComponent implements OnInit {
  accounts: any[] = [];
  clientId: string = '';

  constructor(private route: ActivatedRoute, private accountService: ClientService) { }

  ngOnInit(): void {
    // Récupérer l'ID du client à partir de l'URL
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('clientId') || ''; // Assurez-vous de traiter le cas où clientId est null
      // Appeler la méthode pour récupérer les comptes
      console.log("hello"+this.clientId);
      this.getAccountsByClientId();
    });
  }

  getAccountsByClientId(): void {
    // Vérifier si clientId est défini
    if (this.clientId.trim() !== '') {
      // Appeler le service pour récupérer les comptes
      this.accountService.getAccountsByClientId(this.clientId)
        .subscribe(
          (response) => {
            // Mettre à jour les comptes avec les données reçues
            this.accounts = response.accounts;

            // Set accountId in localStorage
            const firstAccount = this.accounts.length > 0 ? this.accounts[0] : null;
            if (firstAccount) {
              localStorage.setItem('accountId', firstAccount._id);
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération des comptes', error);
            // Gérer l'erreur ici
          }
        );
    }
  }
  
}
