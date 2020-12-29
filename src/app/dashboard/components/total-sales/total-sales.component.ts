import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderFull } from '../../models/order-full.model';

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss']
})
export class TotalSalesComponent implements OnInit,OnChanges {
  @Input() products :OrderFull[]
  total :number;
  orders :number;
  constructor(public firestore :AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('orders').valueChanges().subscribe(val=>{
      this.orders = val.length
    })
  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.products.currentValue){
      this.total = 0;
      this.products.forEach(product=>{
        this.total += product.toPay
      })
    }
  }

}
