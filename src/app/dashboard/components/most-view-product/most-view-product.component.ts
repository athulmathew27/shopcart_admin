import { Component, Input, OnInit } from '@angular/core';
import { ViewProduct } from '../../models/view-product.model'
@Component({
  selector: 'app-most-view-product',
  templateUrl: './most-view-product.component.html',
  styleUrls: ['./most-view-product.component.scss']
})
export class MostViewProductComponent implements OnInit {
  @Input() mostViewedProduct :ViewProduct
  constructor() { }

  ngOnInit(): void {
  }

}
