import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { ProductAddComponent } from '../../components/product-add/product-add.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  currentShow :string = ""
  constructor(private dialog : MatDialog,
              private firestore : AngularFirestore,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let tab = params['tab'];
      if(tab){
        this.currentShow = tab;
      }
    });
  }

  addNewProduct(){
    this.dialog.open(ProductAddComponent);
  }
  addNewCategory(){
    this.dialog.open(CategoryAddComponent);
  }
  viewOrders(){
    this.router.navigate(['admin/home/orders/vieworders'])
  }
  viewCategory(){
    this.router.navigate(['admin/home/category/ViewCategory'])
  }

}
