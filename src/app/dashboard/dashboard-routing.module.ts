import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['/auth/login']);


const routes: Routes = [
  {
    path:'',
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin},
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
