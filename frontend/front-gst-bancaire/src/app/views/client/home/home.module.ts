import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SignUpClientComponent } from './sign-up-client/sign-up-client.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { PageServicesComponent } from './page-services/page-services.component';
import { VirementComponent } from './virement/virement.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { TransactionComponent } from './transaction/transaction.component';


@NgModule({
  declarations: [
    HomeComponent,
    SignUpClientComponent,
    LoginclientComponent,
    PageServicesComponent,
     VirementComponent,
    DetailCompteComponent,
    EditProfilComponent,
    TransactionComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    ReactiveFormsModule,
    FormsModule,
    HomeRoutingModule,
    // MatCommonModule,
    // MatTabsModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule
  ]
})
export class HomeModule { }
