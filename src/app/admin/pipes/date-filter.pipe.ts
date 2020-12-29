import { Pipe, PipeTransform } from '@angular/core';
import { MyorderFull } from '../models/myorder-full.model';
import * as moment from 'moment'
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {


  filteredData :MatTableDataSource<any>

  transform(orderData: MatTableDataSource<any>, start: string, end :string): unknown {

    if(!start && !end){
      return orderData;
    }
    else{

      orderData.filterPredicate = (data, filter)=> {
        return moment(data.orderPlacedTime) < moment(start)
        //  && data.orderPlacedTime <= moment(end);
      }
      if (orderData.paginator) {
        orderData.paginator.firstPage();
      }
      return orderData

      // var source = orderData.filteredData
      // for(let i = 0; i < source.length; i++){
      // let orderDate = source[i].orderPlacedTime.seconds*1000;
      // var date = moment(end).add(1, 'days')
      //   if((moment(orderDate) >= moment(start)) &&(moment(orderDate) <=  date)){
      //     this.filteredData.push(source[i]);
      //   }
      // }
      // orderData.filteredData = this.filteredData;
      // console.log(orderData)
      // if (orderData.paginator) {
      //   orderData.paginator.firstPage();
      // }
      // return orderData
    }
    return null;
  }
}















// if(value){
//   var source = value.filteredData;
//   this.filteredData = [];
//   if(source){
//     for(let i = 0; i < source.length; i++){
//       let orderDate = source[i].orderPlacedTime.seconds*1000;
//       var date = moment(end).add(1, 'days')
//       if((moment(orderDate) >= moment(start)) &&(moment(orderDate) <=  date)){
//         this.filteredData.push(source[i]);
//       }
//     }
//     this.filteredDataTemp.filteredData = this.filteredData
//     if (this.filteredDataTemp.paginator) {
//       this.filteredDataTemp.paginator.firstPage();
//     }
//     return this.filteredDataTemp
//   }
// }
