import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { CategoryListComponent } from './components/category-list/category-list.component'
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['/auth/login']);


const routes: Routes = [
  {
    path:'home',
    component: AdminHomeComponent
  },
  {
    path:'',
    component: AdminHomeComponent
  },
  {
    path:'home/vieworders',
    component: ViewOrdersComponent
  },
  {
    path:'home/ViewCategory',
    component: CategoryListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
