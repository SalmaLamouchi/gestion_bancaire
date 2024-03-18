import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/clients';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})

export class EditProfilComponent implements OnInit {
  client: Client = {
    _id: '',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    estValide: false,
    estSuspendu: false,
    comptesBancaires: []
  };
  id: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve the client ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.id = user.clientId || '';
    
    // Call getProfile with the client ID
    if (this.id) {
      this.clientService.getProfile(this.id).subscribe(
        data => {
          this.client = data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.error("Client ID is undefined");
    }
  }
  
  onSubmit(): void {
    if (this.id) {
      this.clientService.updateProfile(this.id, this.client).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/profil']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.error("Client ID is undefined");
    }
  }
}
