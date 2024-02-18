import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Client } from 'src/app/models/clients';
import { ClientService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-admin-list-clients',
  templateUrl: './admin-list-clients.component.html',
  styleUrls: ['./admin-list-clients.component.css']
})
export class AdminListClientsComponent implements OnInit, AfterViewInit {
  clients: Client[] = [];
  pagedClients: Client[] = [];
  errorMessage!: string;
  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'email'];
  pageSizeOptions: number[] = [2, 10, 20];
  currentPageSize: number = this.pageSizeOptions[0];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getAllValidClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
        console.log('Received clients:', clients); // Log the received clients
      },
      (error) => {
        console.log('Error fetching clients:', error); // Log any errors
      }
    );
  }

  ngAfterViewInit(): void {
    // this.paginator.page.subscribe(() => {
    //   // this.updatePagedClients();
    // });
  }

  getAllClients(): void {
    this.clientService.getAllValidClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
        // this.updatePagedClients();
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }
    );
  }

  // updatePagedClients(): void {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   const endIndex = startIndex + this.paginator.pageSize;
  //   this.pagedClients = this.clients.slice(startIndex, endIndex);
  // }

  // onPageChange(event: PageEvent): void {
  //   this.currentPageSize = event.pageSize;
  //   this.updatePagedClients();
  // }

  onDeleteClient(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this client!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe(
          () => {
            this.clients = this.clients.filter(a => a._id !== id);
            // this.updatePagedClients();
            Swal.fire(
              'Deleted!',
              'The client has been deleted.',
              'success'
            );
          },
          error => {
            console.log(error);
            Swal.fire(
              'Error!',
              'There was an error deleting the client.',
              'error'
            );
          }
        );
      }
    });
  }
}
