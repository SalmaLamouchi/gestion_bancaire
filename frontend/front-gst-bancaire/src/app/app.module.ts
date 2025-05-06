import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
// import { PageServicesComponent } from './views/client/home/page-services/page-services.component';
// import { DashboardModule } from './views/admin/dashboard/dashboard.module';
// import { LoginclientComponent } from './views/client/home/loginclient/loginclient.component';
import { AuthModule } from './views/auth/auth.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthRoutingModule } from './views/auth/auth-routing.module';
import { LoginAdminComponent } from './views/auth/login-admin/login-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { WhoAreYouPageComponent } from './views/who-are-you-page/who-are-you-page.component';
import { ProfilComponent } from './views/client/home/profil/profil.component';
import { LoginclientComponent } from './views/client/home/loginclient/loginclient.component';
import { PageServicesComponent } from './views/client/home/page-services/page-services.component';
// import { AdminListClientsComponent } from './views/admin/dashboard/admin-list-clients/admin-list-clients.component';
import { HomeModule } from './views/client/home/home.module';
import { VirementComponent } from './views/client/home/virement/virement.component';
import { NotificationComponent } from './layouts/notification/notification.component';
import { LocationService } from './services/location.service';
import { BankBranchesComponent } from './views/client/home/bank-branches/bank-branches.component';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { VirementComponent } from './views/client/home/virement/virement.component';
// import { AdminListClientsComponent } from './views/admin/admin-list-clients/admin-list-clients.component';
// import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    WhoAreYouPageComponent,
    ProfilComponent ,   // NotificationComponent,
    // VirementComponent
    // AdminListClientsComponent,
    // PageServicesComponent,
    // LoginclientComponent,
BankBranchesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    // LayoutsModule,
    RouterModule,
    FormsModule,
    // GoogleMapsModule,
    // HomeModule,
    // GoogleMapsModule,
    // LeafletModule,
    ReactiveFormsModule,
     MatSnackBarModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatSnackBar
   
    MatStepperModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
