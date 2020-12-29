import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductOrder } from 'src/app/admin/models/productorder.model';
import { OrderFull } from '../../models/order-full.model';

@Component({
  selector: 'app-staging-orders',
  templateUrl: './staging-orders.component.html',
  styleUrls: ['./staging-orders.component.scss']
})
export class StagingOrdersComponent implements OnInit, OnChanges {

  @Input() products :OrderFull[]
  orderPlaced :number = 0;
  shipped :number = 0;
  nearby :number = 0;
  delivered :number = 0;
  cancelled :number = 0;
  constructor(private firestore :AngularFirestore) { }

  ngOnInit(): void {  }
  ngOnChanges(changes : SimpleChanges){
    if(changes.products.currentValue){
      var orderPlaced = 0;
      var shipped = 0;
      var nearby = 0;
      var delivered = 0;
      var cancelled = 0;
      var status = "";
      this.products.forEach(product => {
        this.firestore.collection('orders').doc(product.myOrderId).collection('products').doc(product.myProductId).collection('status').ref.get().then(statusSnap=>{
          orderPlaced = 0;
          shipped = 0;
          nearby = 0;
          delivered = 0;
          cancelled = 0;
          statusSnap.forEach(status=>{
            if(status.data().status == 'Order Placed'){
              orderPlaced += 1
            }
            if(status.data().status == 'Shipped'){
              shipped += 1
            }
            if(status.data().status == 'Near By'){
              nearby += 1
            }
            if(status.data().status == 'Cancelled'){
              cancelled += 1
            }
            if(status.data().status == 'Delivered'){
              delivered += 1
            }
          })
          if(cancelled > 0){
            status = "cancelled"
            this.cancelled += 1;
          }
          if(orderPlaced > 0 && shipped < 1 && cancelled < 1){
            status = "ordered"
            this.orderPlaced += 1;
          }
          if(shipped > 0 && nearby < 1 && cancelled < 1){
            status = "shipped"
            this.shipped += 1;
          }
          if(nearby > 0 && delivered < 1 && cancelled < 1){
            status = "nearby"
            this.nearby += 1;
          }
          if(delivered > 0 && cancelled < 1){
            status = "delivered"
            this.delivered += 1;
          }

         // console.log( this.orderPlaced, this.shipped, this.nearby, this.delivered, this.cancelled)
        })
      });
    }
  }


}
