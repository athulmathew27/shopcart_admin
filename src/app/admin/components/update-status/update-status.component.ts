import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Orders } from '../../models/order.model';
import { ProductOrder } from '../../models/productorder.model';
import { ProductUpdate } from '../../models/productupdate.model';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit, OnChanges {

  @Input() orderData :Orders;
  @Input() products :ProductOrder[];
  // statusData = [];
  productData :ProductUpdate[] = [];
  selectedProductId :string;
  isShowStatus :boolean = false;
  constructor(private firestore : AngularFirestore) { }
  ngOnInit(): void {  }

  ngOnChanges(changes : SimpleChanges){
    if(changes.orderData.currentValue){
      this.firestore.collection('orders').doc(this.orderData.orderId).collection('products').ref.get().then(productsSnap=>{
        productsSnap.forEach(productDoc=>{
          var products = productDoc.data();
          var productId = {myproductID : productDoc.id}
          var obj = Object.assign({},productId, products);
          var temp = {
            category: obj.category,
            image: obj.image,
            orderPlacedTime: obj.orderPlacedTime,
            price: obj.price,
            product: obj.product,
            productID: obj.productID,
            quantity: obj.quantity,
            myproductID: obj.myproductID
          }
          this.productData.push(temp)
        })
      })
    }
  }
  addNewUpdate(){

  }
  showStatus(orderData, productId){
    this.selectedProductId = productId
    this.isShowStatus = true;
  }
}
