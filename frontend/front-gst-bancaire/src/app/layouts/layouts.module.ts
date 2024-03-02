import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    ClientLayoutComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
