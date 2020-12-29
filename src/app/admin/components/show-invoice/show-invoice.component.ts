import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Orders } from '../../models/order.model';
import { Product } from '../../models/products.model';
import { ProductOrder } from '../../models/productorder.model';

@Component({
  selector: 'app-show-invoice',
  templateUrl: './show-invoice.component.html',
  styleUrls: ['./show-invoice.component.scss']
})
export class ShowInvoiceComponent implements OnInit, OnChanges {

  @Input() orderData :Orders;
  @Output() callParentFunction :EventEmitter<any> = new EventEmitter();
  productDetails :ProductOrder[] = [];
  isShowStatus :boolean = false;
  selectedProductId :string = "";
  constructor(private firestore :AngularFirestore) { }

  ngOnInit(): void {  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.orderData.currentValue){
      this.firestore.collection('orders').doc(this.orderData.orderId).collection('products').ref.get().then((productsSnap)=>{
        productsSnap.forEach((productsDoc)=>{
          var temp = {
            category: productsDoc.data().category,
            image: productsDoc.data().image,
            orderPlacedTime: productsDoc.data().orderPlacedTime,
            price: productsDoc.data().price,
            product: productsDoc.data().product,
            productID: productsDoc.id,
            quantity: productsDoc.data().quantity
          }
          this.productDetails.push(temp)
        })
      })
    }
  }

convetToPDF(){
  const printContent = document.getElementById("componentID");
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(printContent.innerHTML);
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}
onCancel(){
  this.callParentFunction.emit("false")
}
showStatus(productId){
  this.isShowStatus = true;
  console.log(productId)
  this.selectedProductId = productId
}
}
