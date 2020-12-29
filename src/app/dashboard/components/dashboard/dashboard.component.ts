import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderFull } from 'src/app/dashboard/models/order-full.model';
import { ViewProduct } from '../../models/view-product.model'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products :OrderFull[]
  sorted;
  mostViewedProductData :ViewProduct
  constructor( public firestore :AngularFirestore) { }

  ngOnInit(): void {  }
  topSellingProduct(event){
    if(event){
      this.sorted = event.sorted;
      this.products = event.products
    }
  }
  mostViewedProduct(event :ViewProduct){
    this.mostViewedProductData = event
  }

}
