import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getProfile(this.id).subscribe(
      data => {
        this.client = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.clientService.updateClient(this.client._id, this.client).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/profil']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
