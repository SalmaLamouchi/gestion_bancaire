import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { PageServicesComponent } from './page-services/page-services.component';
import { SignUpClientComponent } from './sign-up-client/sign-up-client.component';
// import { VirementComponent } from './virement/virement.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { ProfilComponent } from './profil/profil.component';
import { VirementComponent } from './virement/virement.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
// import { EditProfilComponent } from './;

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginclientComponent},
  {path:'services',component:PageServicesComponent},
  {path:'signup',component:SignUpClientComponent},
  {path:'virement',component:VirementComponent},
  {path:'detail-compte',component:DetailCompteComponent},
  {path:'profil',component:ProfilComponent},
  {path:'profil/edit',component:EditProfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
