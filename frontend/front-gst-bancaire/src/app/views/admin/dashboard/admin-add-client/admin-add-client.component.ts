import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/clients'; // Assuming you have a Client model
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/clients.service'; // Assuming you have a ClientService

@Component({
  selector: 'app-admin-add-client',
  templateUrl: './admin-add-client.component.html',
  styleUrls: ['./admin-add-client.component.css']
})
export class AdminAddClientComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  clientForm: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', Validators.required),
  });

  newClient: Client = {
    _id:'',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    estSuspendu: false,
    estValide: true,
    comptesBancaires: [] // Assuming you have an array of bank accounts in the Client model
  };
  errorMessage: string = '';

  constructor(private clientService: ClientService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nomCtrl: ['', Validators.required],
      prenomCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.newClient.nom = this.clientForm.value.nom;
    this.newClient.prenom = this.clientForm.value.prenom;
    this.newClient.email = this.clientForm.value.email;
    this.newClient.motDePasse = this.clientForm.value.motDePasse;

    this.clientService.createClient(this.newClient)
      .subscribe(
        (client: Client) => {
          console.log('Client added:', client);
          this.router.navigate(['/admin/dash/clients']);
          this.newClient = {
            _id:'',
            nom: '',
            prenom: '',
            email: '',
            motDePasse: '',
            estSuspendu: false,
            estValide: true,
            comptesBancaires: []
          };
          this.clientForm.reset();
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
  }

  onReset() {
    this.newClient = {
      _id:'',
      nom: '',
      prenom: '',
      email: '',
      motDePasse: '',
      estSuspendu: false,
      estValide: true,
      comptesBancaires: []
    };
    this.clientForm.reset();
  }
}
