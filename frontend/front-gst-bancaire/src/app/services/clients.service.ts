import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Client } from '../models/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/admin'; 
  private url = 'http://localhost:3000/client'; 
  private AccUrl='http://localhost:3000/acc'
  constructor(private http: HttpClient) { }

  // Méthode pour créer un nouveau client avec autorisation
  createClient(client: Client): Observable<Client> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    const url = `${this.baseUrl}/clients/add`; // Concatenate baseUrl with '/clients/add'
    return this.http.post<Client>(url, client, httpOptions);
  }

  // Méthode pour récupérer tous les clients validés avec autorisation
  getAllValidClients(): Observable<Client[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Client[]>(`${this.baseUrl}/clients`, httpOptions);
  }

  // Méthode pour récupérer un client par son ID avec autorisation
  getClientById(id: string): Observable<Client> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    if (!id) {
      // Gérer l'erreur ici, comme renvoyer un Observable avec une erreur 404 ou une valeur par défaut
      return throwError("ID not provided");
    }
    return this.http.get<Client>(`${this.baseUrl}/clients/${id}`, httpOptions);
  }

  // Méthode pour mettre à jour un client avec autorisation
  // updateClient(id: string, client: Client): Observable<Client> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     })
  //   };
  //   return this.http.put<Client>(`${this.baseUrl}/clients/${id}`, client, httpOptions);
  // }

  // Méthode pour supprimer un client avec autorisation
  deleteClient(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.delete<any>(`${this.baseUrl}/clients/${id}`, httpOptions);
  }

  // Méthode pour récupérer tous les clients non validés avec autorisation
  getAllNonValidClients(): Observable<Client[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Client[]>(`${this.baseUrl}/nonvalidclients`, httpOptions);
  }

  toggleSuspendAccount(id: string): Observable<Client> {
    const url = `${this.baseUrl}/suspend/${id}`;
    return this.http.put<Client>(url, {});
  }

  getNonValidStudents(): Observable<Client[]> {
    const url = `${this.baseUrl}/invalid`;
    return this.http.get<Client[]>(url);
  }
 


  getProfile(clientId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.http.get<any>(`${this.url}/profile/${clientId}`, { headers });
  }
  
  updateClient(clientId: string, clientData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${this.url}/profile/${clientId}`, clientData, { headers });
  }
  
  
  uploadImage(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post(`${this.url}/uploads`, formData);
  }



  getAccount(clientId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.http.get<any>(`${this.AccUrl}/account/${clientId}`, { headers });
  }

  createAccountForClient(accountData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<any>(`${this.AccUrl}/create-account`, accountData, { headers });
  }





}
