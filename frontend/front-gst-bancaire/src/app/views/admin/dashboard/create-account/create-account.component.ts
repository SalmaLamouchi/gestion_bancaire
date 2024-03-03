import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/clients';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountForm!: FormGroup;
  clients: Client[] = [];
  selectedClient: Client | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getClients();
  }

  initializeForm(): void {
    this.accountForm = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      balance: ['', Validators.required],
    });
  }

  getClients(): void {
    this.clientService.getAllValidClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
      (error) => {
        console.log('Error fetching clients:', error);
      }
    );
  }

  onSelectClient(clientId: string): void {
    this.selectedClient = this.clients.find(client => client._id === clientId);
  }

  onSubmit(): void {
    if (!this.selectedClient) {
      return;
    }

    if (this.accountForm.invalid) {
      return;
    }

    const formData = { 
      ...this.accountForm.value, 
      ownerId: this.selectedClient._id 
    };

    this.clientService.createAccountForClient(formData).subscribe(
      (data) => {
        console.log(data);
        // Gérer le succès si nécessaire
      },
      (error) => {
        console.log(error);
        // Gérer l'erreur si nécessaire
      }
    );
  }
}
