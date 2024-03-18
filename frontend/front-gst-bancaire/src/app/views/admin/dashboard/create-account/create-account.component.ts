import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  accountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService,private router: Router) {
    this.accountForm = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      balance: ['', Validators.required],
      ownerId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.clientService.createAccount(this.accountForm.value)
        .subscribe(
          (response) => {
            console.log('Account created successfully', response);
            // Traitez la réponse ici si nécessaire
            this.router.navigate(['admin/dash/clients']);
          },
          (error) => {
            console.error('Error creating account', error);
            // Gérez l'erreur ici si nécessaire
          }
        );
    }
  }
}
