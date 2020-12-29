import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {

  filteredData = [];
  transform(value: MatTableDataSource<any>, arg: unknown): unknown {
    if(arg){
      this.filteredData = []
      if(arg == "paymentTypeCOD"){
        if(value.filteredData){
          for (let i = 0; i < value.filteredData.length; i++) {
            if(value.filteredData[i].paymentType == "COD"){
              this.filteredData.push(value.filteredData[i])
            }
          }
        }
      }
      else{
        if(value.filteredData){
          for (let i = 0; i < value.filteredData.length; i++) {
            if(value.filteredData[i].paymentType == "Net Banking"){
              this.filteredData.push(value.filteredData[i])
            }
          }
        }
      }
    }
    else{
      return value
    }
    return this.filteredData;
  }

}
