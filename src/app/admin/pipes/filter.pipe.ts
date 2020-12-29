import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Myorders } from '../models/my-orders.model';
import { MyorderFull } from '../models/myorder-full.model';
import { Orders } from '../models/order.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

   filteredData : MatTableDataSource<Orders> ;

  transform(orderData: MatTableDataSource<Orders>, filterVal: string): unknown {
    if(!filterVal){
      return orderData
    }
    else{
      this.filteredData = orderData;
     var searchOnColumn : string[] = ['paymentType'];
     this.filteredData.filterPredicate = (data, filter)=>{
      return searchOnColumn.some(element=>{
        return element != 'actions' && data[element].toLowerCase().indexOf(filter) != -1;
      })
      if(filterVal == "paymentTypeCOD"){
        this.filteredData.filter = "COD";
        if (this.filteredData.paginator) {
          this.filteredData.paginator.firstPage();
        }
        return this.filteredData
      }
      else{
        this.filteredData.filter = "Net Banking";
        if (this.filteredData.paginator) {
          this.filteredData.paginator.firstPage();
        }
        return this.filteredData
      }
    }
  }



  return this.filteredData;
  }

}
