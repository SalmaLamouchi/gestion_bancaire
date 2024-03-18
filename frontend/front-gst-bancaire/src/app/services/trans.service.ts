// trans.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransService {

  private API_BASE_URL = 'http://localhost:3000/transaction'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  effectuerVirement(compteSourceId: string, compteDestinationId: string, montant: number): Observable<any> {
    const url = `${this.API_BASE_URL}/virement`;
    const body = {
      compteSourceId,
      compteDestinationId,
      montant
    };
    
    return this.http.post<any>(url, body);
  }
 
  getTransactionsByAccountId(accountId: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/tran/${accountId}`);
  }



}

