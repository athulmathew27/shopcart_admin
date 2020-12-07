import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent} from '../app/admin/components/page-not-found/page-not-found.component'

const routes: Routes = [
{
  path: '',
  loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
},
{
  path: 'auth',
  loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
},
{
  path: 'admin',
  loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
},
{
  path:'**',
  component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
