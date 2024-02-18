import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {

  passwordForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private PasswordService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get f() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.passwordForm.invalid) {
      return;
    }
    const email = this.passwordForm.get('email')?.value;
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    this.PasswordService.changePassword(email, currentPassword, newPassword).subscribe(
      Response => {
        alert("Password changed successfully!");
        this.router.navigate(['/admin/dash']);
      },
      error => {
        alert("check your login data!");
        this.errorMessage = error.error.message;
      }
    );
  }

}
