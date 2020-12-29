import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { CategoryListComponent } from './components/category-list/category-list.component'

import { ProductListComponent } from './components/product-list/product-list.component';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['/auth/login']);


const routes: Routes = [

  {
    path:'orders',
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin},
    component: ViewOrdersComponent
  },
  {
    path:'category',
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin},
    component: CategoryListComponent
  },
  {
    path:'product',
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin},
    component: ProductListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
