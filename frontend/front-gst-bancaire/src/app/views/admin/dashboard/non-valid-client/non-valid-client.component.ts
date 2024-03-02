import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Client } from 'src/app/models/clients';
import { ClientService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-non-valid-client',
  templateUrl: './non-valid-client.component.html',
  styleUrls: ['./non-valid-client.component.css']
})
export class NonValidClientComponent implements OnInit {
  clients: Client[] = [];
  // pagedClients: Client[] = [];
  errorMessage!: string;
  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'email'];
  pageSizeOptions: number[] = [2, 10, 20];
  currentPageSize: number = this.pageSizeOptions[0];

  constructor(private clientService:   ClientService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getNonValidClients();
  }

  getNonValidClients() {
    this.clientService.getAllNonValidClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
        // this.updatePagedClients();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  validateClient(client: Client) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir valider cet client ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        client.estValide = true;
        this.clientService.updateClient(client._id, client).subscribe(
          () => {
            console.log('Client validated:', client);
            this.clients = this.clients.filter((s) => s._id !== client._id);
            // this.updatePagedClients();
          },
          (error: any) => {
            console.error(error);
            this.errorMessage = error.message;
          }
        );
      }
    });
  }

  // updatePagedClients(): void {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   const endIndex = startIndex + this.paginator.pageSize;
  //   this.pagedClients = this.clients.slice(startIndex, endIndex);
  // }

  // onPageChange(event: PageEvent): void {
  //   this.currentPageSize = event.pageSize;
  //   this.paginator.pageIndex = event.pageIndex; // Update the current page index
  //   this.updatePagedClients();
  // }

  // ngAfterViewInit(): void {
  //   this.paginator.page.subscribe(() => {
  //     // this.updatePagedClients();
  //   });
  // }
}

