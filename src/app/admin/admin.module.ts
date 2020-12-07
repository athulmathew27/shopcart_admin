import { NgModule } from '@angular/core';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component'
import { ProductAddComponent} from './components/product-add/product-add.component'
import { CategoryAddComponent} from './components/category-add/category-add.component'
import { CategoryListComponent} from './components/category-list/category-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule} from '../shared/shared.module';
import { ProductsService } from './services/products.service';



@NgModule({
  declarations: [
    AdminHomeComponent,
    ViewOrdersComponent,
    FilterPipe,
    SearchPipe,
    FilterComponent,
    DateFilterPipe,
    ProductAddComponent,
    CategoryAddComponent,
    CategoryListComponent,
    PageNotFoundComponent,
  ],
  providers:[
    ProductsService
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,

  ]
})
export class AdminModule { }
