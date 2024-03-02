import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginAdminComponent } from '../../auth/login-admin/login-admin.component';
import { AdminListClientsComponent } from './admin-list-clients/admin-list-clients.component';
import { AdminAddClientComponent } from './admin-add-client/admin-add-client.component';
import { AdminClientDetailComponent } from './admin-client-detail/admin-client-detail.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { NonValidClientComponent } from './non-valid-client/non-valid-client.component';
import { NotificationComponent } from '../../../layouts/notification/notification.component';
// import { LoginAdminComponent } from './login-admin/login-admin.component';

const routes: Routes = [
{path:'',component:DashboardComponent},
 {path:'clients',component:AdminListClientsComponent},
{path:'clients/add',component:AdminAddClientComponent},
{path:'clients/:id',component:AdminClientDetailComponent},
{path:'changerPwd',component:ChangePwdComponent},
{path:'nonvalid',component:NonValidClientComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
