import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profile: any;
  error!: string;
  clientId: string = ''; // Add a variable to store the client ID

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    // Retrieve the client ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.clientId = user.clientId || '';
    
    // Call fetchProfile with the client ID
    this.fetchProfile(this.clientId);
  }

  fetchProfile(clientId: string) {
    this.clientService.getProfile(clientId).subscribe(
      (data) => {
        this.profile = data.client; // Assuming the profile object is nested under 'client'
        console.log(this.profile);
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
