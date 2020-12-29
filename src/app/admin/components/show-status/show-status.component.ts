import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Orders } from '../../models/order.model';
import { StatusData } from '../../models/status.model';
@Component({
  selector: 'app-show-status',
  templateUrl: './show-status.component.html',
  styleUrls: ['./show-status.component.scss']
})
export class ShowStatusComponent implements OnInit, OnChanges {
  @Input() orderData :Orders
  @Input() productId :string
  statusData :StatusData[] = []
  showAddUpdate :boolean = false;
  ordered :number = 0;
  shipped :number = 0;
  nearby :number = 0;
  delivered :number = 0;
  cancelled :number = 0;
  currentStatus;
  constructor(private firestore :AngularFirestore,) { }

  ngOnInit(): void { }
  ngOnChanges(changes :SimpleChanges){
    this.statusData = [];
    this.ordered = 0;
    this.shipped = 0;
    this.nearby = 0;
    this.delivered = 0;
    this.cancelled = 0;
    if(changes.productId.currentValue){
      this.firestore.collection('orders').doc(this.orderData.orderId).collection('products').doc(this.productId).collection('status').valueChanges().subscribe(snap=>{
        this.statusData = [];
        snap.forEach(statusDoc => {
          var status = statusDoc;
          if(status.status == "Order Placed"){
            this.ordered += 1;
          }
          if(status.status == "Shipped"){
            this.shipped += 1;
          }
          if(status.status == "Near By"){
            this.nearby += 1;
          }
          if(status.status == "Delivered"){
            this.delivered += 1;
          }
          if(status.status == "Cancelled"){
            this.cancelled += 1;
          }
          var productId = {productId : this.productId}
          var newObj = Object.assign({},status, productId)
          var temp = {
            status : newObj.status,
            text :newObj.text,
            time :newObj.time,
            location :newObj.location,
            productId : newObj.productId
          }
          this.statusData.push(temp)
        });
        this.currentStatus = {
        orderd : this.ordered,
        shipped : this.shipped,
        nearby : this.nearby,
        delivered : this.delivered,
        cancelled : this.cancelled
        }
      })
    }
  }
  addNewUpdate(){
    this.showAddUpdate = true;
  }
  showAddUpdateStatusToggle($event){
    this.showAddUpdate = false;
  }
}
