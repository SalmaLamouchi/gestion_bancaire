import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
// import { PageServicesComponent } from './views/client/home/page-services/page-services.component';
// import { DashboardModule } from './views/admin/dashboard/dashboard.module';
// import { LoginclientComponent } from './views/client/home/loginclient/loginclient.component';

@NgModule({
  declarations: [
    AppComponent,
    // PageServicesComponent,
    // LoginclientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
