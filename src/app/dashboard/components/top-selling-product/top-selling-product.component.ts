import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemView } from '../../models/item-view.model';
import { ProductOrder } from 'src/app/admin/models/productorder.model';

@Component({
  selector: 'app-top-selling-product',
  templateUrl: './top-selling-product.component.html',
  styleUrls: ['./top-selling-product.component.scss']
})
export class TopSellingProductComponent implements OnInit,OnChanges {
  @Input() sorted;
  @Input() products :ProductOrder[];
  filteredProducts :ItemView[] = [];
  constructor() { }

  ngOnInit(): void {  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.sorted.currentValue){
      if(this.sorted.length <= 5){
        for (let i = 0; i < this.sorted.length; i++) {
          var result = this.products.filter(x => x.productID === this.sorted[i].productId);
          var newObj = {
            image : result[0].image,
            name : result[0].product,
            count : this.sorted[i].profit
          }
          this.filteredProducts.push(newObj)
        }
      }
      else{
        for (let i = 0; i < 5; i++) {
          var result = this.products.filter(x => x.productID === this.sorted[i].productId);
          var newObj = {
            image : result[0].image,
            name : result[0].product,
            count : this.sorted[i].profit
          }
          this.filteredProducts.push(newObj)
        }
      }
    }
  }

}
