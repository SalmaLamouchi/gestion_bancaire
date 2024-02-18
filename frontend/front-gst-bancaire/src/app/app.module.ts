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
// import { AdminListClientsComponent } from './views/admin/admin-list-clients/admin-list-clients.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    // AdminListClientsComponent
    // PageServicesComponent,
    // LoginclientComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
     MatSnackBarModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatSnackBar
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
