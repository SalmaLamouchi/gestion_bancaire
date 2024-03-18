import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';
import { TransService } from 'src/app/services/trans.service'; // Import the transaction service

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.css']
})
export class DetailCompteComponent implements OnInit {
  showTransactions: boolean = false; 
  account: any;
  transactions: any[] = []; // Array to store transactions
  error!: string;
  clientId: string = ''; // Add a variable to store the client ID

  constructor(private clientService: ClientService, private transactionService: TransService) { }

  ngOnInit(): void {
    // Retrieve the client ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.clientId = user.clientId || '';
    
    // Call fetchAccount with the client ID
    this.fetchAccount(this.clientId);
  }

  fetchAccount(clientId: string) {
    this.clientService.getAccount(clientId).subscribe(
      (data) => {
        this.account = data.account;
        console.log(this.account);
        
        // After fetching the account, fetch transactions for the account ID
        if (this.account && this.account._id) {
          this.fetchTransactionsByAccountId(this.account._id);
        }
      },
      (error) => {
        this.error = error;
      }
    );
  }


  toggleTransactions() {
    this.showTransactions = !this.showTransactions;
    if (this.showTransactions) {
      // Call a method to fetch transactions if needed
      // For example: this.fetchTransactions();
    }
  }

  fetchTransactionsByAccountId(accountId: string) {
    this.transactionService.getTransactionsByAccountId(accountId).subscribe(
      (data) => {
        this.transactions = data.transactions; 
        console.log(this.transactions); // Assuming the service returns an object containing an array of transactions with the key 'transactions'
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
