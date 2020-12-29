import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductOrder } from 'src/app/admin/models/productorder.model';

@Component({
  selector: 'app-most-selling-category',
  templateUrl: './most-selling-category.component.html',
  styleUrls: ['./most-selling-category.component.scss']
})
export class MostSellingCategoryComponent implements OnInit, OnChanges {
  @Input() products :ProductOrder[]
  category :string[] = [];
  filteredCategory = [];
  finalResult = [];
  constructor() { }
  ngOnInit(): void {}
  ngOnChanges(changes :SimpleChanges){
    if(changes.products.currentValue){
      for (let i = 0; i < this.products.length; i++) {
        if(!this.category.includes(this.products[i].category)){
          this.category.push(this.products[i].category)
        }
      }
      this.filter();
    }
  }
  filter(){
    var quantity = 0
    for (let i = 0; i < this.category.length; i++) {
      var result = this.products.filter(x => x.category === this.category[i]);
      if(result){
        quantity = 0;
        for (let j = 0; j < result.length; j++) {
          quantity += result[j].quantity;
        }
        var obj = {
          category :result[0].category,
          quantity : quantity,
          count : result.length
        }
        this.filteredCategory.push(obj)
      }
    }
    this.sorter()
  }
  sorter(){
    var sorted = this.filteredCategory.sort((a,b)=>{
      return b.quantity - a.quantity
    })
    if(sorted.length <=5){
      this.finalResult = sorted;
    }
    else{
      sorted.length = 5;
      this.finalResult = sorted;
    }
  }
}
