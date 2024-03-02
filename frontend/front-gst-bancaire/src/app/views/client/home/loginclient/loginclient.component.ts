import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginclient',
  templateUrl: './loginclient.component.html',
  styleUrls: ['./loginclient.component.css']
})
export class LoginclientComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.loginClient(email, password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.client));
        // localStorage.setItem('userId', response.Client.clietoString());

        
        
        this.router.navigateByUrl('/services'); // Redirection vers /services
      },
      (error) => {
        this.snackBar.open('Unauthorized access', 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
