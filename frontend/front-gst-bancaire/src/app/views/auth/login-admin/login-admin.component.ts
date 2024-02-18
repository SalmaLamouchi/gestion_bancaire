import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})

export class LoginAdminComponent {
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

    this.authService.login(email, password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        // localStorage.setItem('admin', JSON.stringify(response.admin));
        // localStorage.setItem('adminId', response.admin.adminId);

        // localStorage.setItem('adminId',response.admin.adminId);
        
        this.router.navigateByUrl('/admin/dash'); // Redirection vers /admin/dash
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
