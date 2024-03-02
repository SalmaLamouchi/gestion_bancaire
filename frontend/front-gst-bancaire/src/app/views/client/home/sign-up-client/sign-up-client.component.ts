import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up-client',
  templateUrl: './sign-up-client.component.html',
  styleUrls: ['./sign-up-client.component.css']
})
export class SignUpClientComponent implements OnInit {
    form: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.form = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        motDePasse: ['', [Validators.required, Validators.minLength(8)]],
      });
    }
  
    ngOnInit(): void {}
  
    onSubmit(): void {
      if (this.form.invalid) {
        return;
      }
  
      const { nom, prenom, email, motDePasse } = this.form.value;
  
      this.authService.signupClient(nom, prenom, email, motDePasse).subscribe(
        () => {
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  

