import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemView } from '../../models/item-view.model';
import { ViewProduct } from '../../models/view-product.model'
import { ProductView } from '../../models/product-view.model'
@Component({
  selector: 'app-most-view-products',
  templateUrl: './most-view-products.component.html',
  styleUrls: ['./most-view-products.component.scss']
})
export class MostViewProductsComponent implements OnInit {
  productsId :string[] = [];
  products :ProductView[] = [];
  filteredProduct :ViewProduct[] = [];
  finalResult:ViewProduct[] = [];
  @Output() mostViewedProduct :EventEmitter<ViewProduct> = new EventEmitter()
  constructor(public firestore :AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection<ProductView>('most_viewed').ref.get().then(productsSnap=>{
      productsSnap.forEach(product=>{
        this.products.push(product.data())
        if(!this.productsId.includes(product.data().productId)){
          this.productsId.push(product.data().productId)
        }
      })
      this.filter(this.productsId)
    })
  }
  filter(productId){
    for (let i = 0; i < this.productsId.length; i++) {
      var result = this.products.filter(x => x.productId === this.productsId[i]);
      if(result){
        var newObj :ViewProduct = {
          productId : result[0].productId,
          product : result[0].product,
          image : result[0].image,
          views : result.length
        }
        this.filteredProduct.push(newObj)
      }
    }
    this.sorter();
  }
  sorter(){
    var sorted = this.filteredProduct.sort(function(a, b){
      return b.views - a.views;
    })
    this.mostViewedProduct.emit(sorted[0])
    if(sorted.length <= 5){
      this.finalResult = sorted;
    }
    else{
      sorted.length = 5;
      this.finalResult = sorted
    }
  }
}
