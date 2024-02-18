import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/clients.service';
import { Client } from 'src/app/models/clients';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-client-detail',
  templateUrl: './admin-client-detail.component.html',
  styleUrls: ['./admin-client-detail.component.css']
})
export class AdminClientDetailComponent implements OnInit {
  client!: Client;
  // clientLoaded: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private clientService: ClientService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getClient();
   
  }

  getClient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.clientService.getClientById(id).subscribe(
        (client: Client) => {
          this.client = client;
          console.log('Données du client :', this.client);
          console.log(client.nom); // Should now display the client's name
        },
        (error: any) => {
          this.errorMessage = 'Une erreur s\'est produite lors de la récupération des détails du client.';
          console.error('Erreur lors de la récupération des détails du client :', error);
        }
      );
    }
  }
  





  toggleSuspendAccount(id: string): void {
    const action = this.client?.estSuspendu ? 'reactivate' : 'suspend';
    const confirmationText = `You are about to ${action} this account.`;

    Swal.fire({
      title: 'Are you sure?',
      text: confirmationText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.toggleSuspendAccount(id).subscribe(
          () => {
            this.client.estSuspendu = !this.client.estSuspendu;
            const actionText = action === 'suspend' ? 'suspended' : 'reactivated';
            Swal.fire(
              'Success!',
              `The account has been ${actionText}.`,
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error!',
              `An error has occurred while ${action}ing the account.`,
              'error'
            );
            console.error('Error toggling account status:', error);
          }
        );
      }
    });
  }
}
