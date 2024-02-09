import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { PageServicesComponent } from './page-services/page-services.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginclientComponent},
  {path:'services',component:PageServicesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
