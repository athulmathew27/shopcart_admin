import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { ProductAddComponent } from '../../components/product-add/product-add.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private dialog : MatDialog,
              private firestore : AngularFirestore,
              private router : Router) { }

  ngOnInit(): void {
  }

  addNewProduct(){
    this.dialog.open(ProductAddComponent);
  }
  addNewCategory(){
    this.dialog.open(CategoryAddComponent);
  }
  viewOrders(){
    this.router.navigate(['admin/home/vieworders'])
  }
  viewCategory(){
    this.router.navigate(['admin/home/ViewCategory'])
  }

}
