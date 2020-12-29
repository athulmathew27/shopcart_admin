import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment'
import { Orders } from 'src/app/admin/models/order.model';
@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.scss']
})
export class GeneralStatisticsComponent implements OnInit {
  onSale :number = 0;
  count :number = 0;
  constructor(public firestore :AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('products').ref.where('stock', '>', 0 ).get().then(snap=>{
      this.onSale = snap.docs.length
    })
    var dateFrom = moment(dateFrom).subtract(1,'months').endOf('month').format('YYYY-MM-DD');
    var lastMonth = new Date(dateFrom).getTime();
    this.firestore.collection<Orders>('orders').ref.get().then(snap=>{
      this.count = 0;
      snap.forEach(docs=>{
        var orderPlacedTime = docs.data().orderPlacedTime.seconds*1000
        if(orderPlacedTime > lastMonth){
          this.count++;
        }
      })
    })
  }

}
