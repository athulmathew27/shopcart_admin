import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../models/category.model';
import { Product } from '../../models/products.model';

import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { DeleteConfirmComponent } from 'src/app/shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements AfterViewInit, OnInit {

  categories = [];
  isLoadingResults :boolean = true;
  displayColumn : string[] = ['index','category_name', 'products_count', 'options'];
  dataSource : MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private firestore : AngularFirestore,
              private dialog : MatDialog) {  }

  ngOnInit(){
    this.firestore.collection<Category>('category').valueChanges({idField : 'categoryId'}).subscribe(categorySnap=>{
      categorySnap.forEach(categoryDoc=>{
        this.firestore.collection<Product>('products',ref => ref.where('categoryName', '==', categoryDoc.name)).valueChanges({idField: 'productId'}).subscribe(val=>{
          var count = { length : val.length}
          var newObj = Object.assign({}, categoryDoc, count)
          this.categories.push(newObj)
        })
      })
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.categories)
    })
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.dataSource.paginator = this.paginator;
    },3000)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      setTimeout(()=>{
        this.dataSource.paginator.firstPage();
      },3000)
    }
  }

  addNewCategory(){
    this.dialog.open(CategoryAddComponent)
  }

  onDelete(id){
    const dialogRef = this.dialog.open(DeleteConfirmComponent,{
      width : '390px',
      disableClose : true,
      data : {
        message : "Are you sure, you want to delete this feild"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.firestore.collection('category').doc(id).delete()
      }
    });
  }
  onEdit(category){
    console.log("xc", category)
    this.dialog.open(CategoryAddComponent, {
      data : category,
      width : '100%',
      minWidth : '320px',
      maxWidth : '700px'
    })
  }
}
