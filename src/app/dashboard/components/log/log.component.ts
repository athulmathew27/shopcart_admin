import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Orders } from 'src/app/admin/models/order.model';
import * as moment from 'moment'
import { Product } from 'src/app/admin/models/products.model';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  logData = []
  constructor(private firestore :AngularFirestore) {}
  ngOnInit(): void {
    this.firestore.collection<Orders>('orders').ref.onSnapshot(snapshot=>{
      snapshot.docChanges().forEach((change)=> {
        let docTime = change.doc.data().orderPlacedTime.seconds*1000;
        let date = new Date();
        let yesterday = date.setDate(date.getDate() - 1)
        let y = new Date(yesterday).getTime()
        if(docTime > y){
          if (change.type === "added") {
            var newObj = {
              time : change.doc.data().orderPlacedTime,
              message : "New Order is Placed",
              sub : change.doc.id,
              id : change.doc.id,
            }
            if(!this.logData.includes({id : change.doc.id})){
              this.logData.push(newObj)
            }
          }
        }
      });
    })

    this.firestore.collection<Product>('products').ref.where("stock", "<", 1).onSnapshot(snapshot=>{
      snapshot.docChanges().forEach((change)=> {
        if (change.type === "added") {
          var newObj = {
            time : new Date(),
            message : "Out of Stock",
            sub : change.doc.data().name,
            id : change.doc.id,
          }
          if(!this.logData.includes({id : change.doc.id})){
            this.logData.push(newObj)
          }
        }
      });
    })

    this.firestore.collection<Orders>('orders').valueChanges({idField : 'orderId'}).subscribe(orderSnap=>{
      orderSnap.forEach(orderDoc=>{
        this.firestore.collection('orders').doc(orderDoc.orderId).collection('products').valueChanges({idField : 'myProductId'}).subscribe(productSnap=>{
          productSnap.forEach(productDoc=>{
            this.firestore.collection('orders').doc(orderDoc.orderId).collection('products').doc(productDoc.myProductId).collection('status').valueChanges({idField : 'statusId'}).subscribe(statusSnap=>{
              statusSnap.forEach(statusDoc => {
                if(statusDoc.status == "Cancelled"){
                  var newObj = {
                    time : statusDoc.time,
                    message : "Cancelled",
                    sub : productDoc.product,
                    id : statusDoc.statusId
                  }
                  if(!this.logData.some(item => item.id === statusDoc.statusId)){
                    this.logData.push(newObj)
                  }
                  // if(!this.logData.includes({id : statusDoc.statusId})){
                  // }
                }
              });
            })
          })
        })
      })
    })
  }
}
