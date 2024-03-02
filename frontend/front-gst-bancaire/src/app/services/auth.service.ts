import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl="http://localhost:3000/auth";

  constructor(private http: HttpClient) { }



  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password });
  }

  loginClient(email: string, motDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/loginct`, { email, motDePasse });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  logoutAdmin(): Observable<any> {
    return this.http.post(`${this.authUrl}/logout`, {});
    }

    changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const body = { email, currentPassword, newPassword };
    return this.http.post(`${this.authUrl}/password`, body);
  }


  public isAuthenticatedAdmin() {
    let token= localStorage.getItem('token');
    // console.log(token);
    if(token){
      return true;
    }else{
      return false;
    }
  }


  signupClient(nom: string, prenom: string, email: string, motDePasse: string): Observable<any> {
    const body = { nom, prenom, email, motDePasse, estValide: false };
    return this.http.post(`${this.authUrl}/signup`, body);
  }




}

