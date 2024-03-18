import { Component, OnInit } from '@angular/core';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  clientId: string = ''; // Client ID whose transactions need to be retrieved
  transactions: any[] = []; // Array to store transactions

  constructor(private transactionService: TransService) { }

  ngOnInit(): void {
    // Retrieve clientId from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.clientId) {
        this.clientId = user.clientId;
        // console.log(`Retrieved clientId: ${this.clientId}`);
        
        this.loadTransactions(); // Call the method to load transactions
      } else {
        console.error('Invalid clientId found in localStorage.');
      }
    } else {
      console.error('No user data found in localStorage.');
    }
  }

  loadTransactions(): void {
    if (!this.clientId) {
      console.error('Client ID not provided.');
      return;
    }

    this.transactionService.getTransactionsByAccountId(this.clientId).subscribe(
      (data) => {
        this.transactions = data.transactions; 
        console.log(this.transactions);   // Assuming the service returns an object containing an array of transactions with the key 'transactions'
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
