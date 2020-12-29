import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Orders } from 'src/app/admin/models/order.model';
import { ProductOrder } from 'src/app/admin/models/productorder.model';
import { OrderFull } from 'src/app/dashboard/models/order-full.model';

@Component({
  selector: 'app-best-sell-product',
  templateUrl: './best-sell-product.component.html',
  styleUrls: ['./best-sell-product.component.scss']
})
export class BestSellProductComponent implements OnInit {
  products :OrderFull[] = []
  productId :string[] = [];
  productQuantity = [];
  product :ProductOrder ;
  @Output() mostProfitProduct :EventEmitter<any> = new EventEmitter();
  constructor(public firestore :AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection<Orders>('orders').ref.get().then(orderSnap=>{
      orderSnap.forEach(orderDoc=>{
        this.firestore.collection('orders').doc(orderDoc.id).collection<ProductOrder>('products').ref.get().then(productSnap=>{
          productSnap.forEach(productDoc=>{
            if(!this.productId.includes(productDoc.data().productID)){
              this.productId.push(productDoc.data().productID)
            }
            var newObj = {
              myProductId : productDoc.id,
              myOrderId : orderDoc.id,
              category: productDoc.data().category,
              image: productDoc.data().image,
              price: productDoc.data().price,
              product: productDoc.data().product,
              productID: productDoc.data().productID,
              quantity: productDoc.data().quantity,
              delivaryAddress: orderDoc.data().delivaryAddress,
              orderPlacedTime: orderDoc.data().orderPlacedTime,
              paymentType: orderDoc.data().paymentType,
              toPay: parseInt(orderDoc.data().toPay),
              userId: orderDoc.data().userId,
            }
            //var newObj = Object.assign({}, productData, Ids, orderDoc.data())
            this.products.push(newObj)
          })
        })
      })
      setTimeout(()=>{
        this.quantitySorter()
      },2000)
    })
  }
  quantitySorter(){
    var count = 0;
    var profit = 0;
    if(this.productId && this.products){
      for (let j = 0; j < this.productId.length; j++) {
        count = 0;
        profit = 0;
        for (let i = 0; i < this.products.length; i++) {
          if(this.productId[j] == this.products[i].productID){
            count += this.products[i].quantity
            profit = profit + (this.products[i].quantity * this.products[i].price)
          }
        }
        var obj = {productId : this.productId[j], quantity : count, profit : profit}
        this.productQuantity.push(obj);
      }
      var sorted = this.productQuantity.sort(function(a, b){
        return b.quantity - a.quantity;
      })
      if(sorted.length > 0){
        var newObj = {
          sorted : sorted,
          products : this.products
        }
        this.mostProfitProduct.emit(newObj)
        var selectedProductId = sorted[0].productId;
        for (let i = 0; i < this.products.length; i++) {
          if(this.products[i].productID == selectedProductId){
            this.product = this.products[i]
            break;
          }
        }
      }
    }
  }
}
