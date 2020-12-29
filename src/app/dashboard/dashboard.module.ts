import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule} from './dashboard-routing.module';
import { BestSellProductComponent } from './components/best-sell-product/best-sell-product.component';
import { MostViewProductsComponent } from './components/most-view-products/most-view-products.component';
import { TopSellingProductComponent } from './components/top-selling-product/top-selling-product.component';
import { ItemRowComponent } from './components/item-row/item-row.component';
import { MostViewProductComponent } from './components/most-view-product/most-view-product.component';
import { MostSellingCategoryComponent } from './components/most-selling-category/most-selling-category.component';
import { GeneralStatisticsComponent } from './components/general-statistics/general-statistics.component';
import { StagingOrdersComponent } from './components/staging-orders/staging-orders.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { TotalSalesComponent } from './components/total-sales/total-sales.component';
import { LogComponent } from './components/log/log.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BestSellProductComponent,
    MostViewProductsComponent,
    TopSellingProductComponent,
    ItemRowComponent,
    MostViewProductComponent,
    MostSellingCategoryComponent,
    GeneralStatisticsComponent,
    StagingOrdersComponent,
    ActivityLogComponent,
    TotalSalesComponent,
    LogComponent,
    SalesChartComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
