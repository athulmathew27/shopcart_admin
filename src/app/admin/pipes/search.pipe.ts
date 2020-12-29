import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyorderFull } from '../models/myorder-full.model';
import { Orders } from '../models/order.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  filteredData : MatTableDataSource<Orders>
  //  filteredData :MyorderFull = []
  transform(orderData: MatTableDataSource<Orders>, searchBy: string): unknown {
    if(!searchBy){
      return orderData
    }
    else{
      this.filteredData = orderData;
      var searchOnColumn : string[] = ['orderId', 'delivaryAddress'];
      this.filteredData.filterPredicate = (data, filter)=>{
        return searchOnColumn.some(element=>{
          return element != 'actions' && data[element].toLowerCase().indexOf(filter) != -1;
        })
      }
      this.filteredData.filter = searchBy.toLowerCase();
      if (this.filteredData.paginator) {
        this.filteredData.paginator.firstPage();
      }
      return this.filteredData
    }
    return null
  }

}
