import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginAdminComponent } from './views/auth/login-admin/login-admin.component';

const routes: Routes = [
{path:'',component:ClientLayoutComponent,children:[
  {path:'',loadChildren:()=>import('./views/client/home/home.module').then(m=>m.HomeModule)},

]},
{path:'admin',component:AdminLayoutComponent,children:[

  {path:'dash',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  // {path:'',component:LoginAdminComponent}
]},

{path:'loginadmin',component:LoginAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
