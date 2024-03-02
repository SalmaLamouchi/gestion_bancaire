import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent {

  ngOnInit() {
    this.checkAuthenticationStatus();
  }
  verifyuser:any;
  constructor(private authService: AuthService, private router: Router) { }
  checkAuthenticationStatus() {
    if (this.authService.isAuthenticatedAdmin()) {
      this.verifyuser = true;
    } else {
      this.verifyuser = false;
    }}
 
    logout() {
      this.authService.logoutAdmin().subscribe(
        (response) => {
          console.log(response);
          localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
          this.router.navigate(['/home']);      },
        (error) => {
          console.log(error);
        }
      );
    }

}


