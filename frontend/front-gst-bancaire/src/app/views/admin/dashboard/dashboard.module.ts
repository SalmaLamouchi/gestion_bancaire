import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AdminListClientsComponent } from './admin-list-clients/admin-list-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminAddClientComponent } from './admin-add-client/admin-add-client.component';
import { AdminClientDetailComponent } from './admin-client-detail/admin-client-detail.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { NonValidClientComponent } from './non-valid-client/non-valid-client.component';
// import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminListClientsComponent,
    AdminAddClientComponent,
    AdminClientDetailComponent,
    ChangePwdComponent,
    NonValidClientComponent
    // LoginAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatPaginatorModule,
    DashboardRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule
  ]
})
export class DashboardModule { }
