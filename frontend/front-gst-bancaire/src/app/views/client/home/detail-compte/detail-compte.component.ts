import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.css']
})
export class DetailCompteComponent implements OnInit {

  account: any;
  error!: string;
  clientId: string = ''; // Add a variable to store the client ID

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    // Retrieve the client ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.clientId = user.clientId || '';
    
    // Call fetchAccount with the client ID
    this.fetchAccount(this.clientId);
  }

  fetchAccount(clientId: string) {
    this.clientService.getAccount(clientId).subscribe(
      (data) => {
        this.account = data.account;
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
