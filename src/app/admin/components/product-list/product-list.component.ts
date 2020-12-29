import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';

import { DeleteConfirmComponent } from 'src/app/shared/components/delete-confirm/delete-confirm.component';
import { Product } from '../../models/products.model';
import { ProductAddComponent } from '../product-add/product-add.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  isLoadingResults :boolean = true;
  products :MatTableDataSource<any>;
  displayColumn : string[] = ['index', 'product', 'image', 'category', 'price', 'stock', 'options'];
  searchOnColumn : string[] = ['name', 'categoryName'];
  // dataSource = new MatTableDataSource<any>(this.products)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort
  constructor(public firestore :AngularFirestore,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.firestore.collection('products').valueChanges({idField : 'productId'}).subscribe(productsSnap=>{
      this.isLoadingResults = false;
      //this.products = productsSnap;
      this.products = new MatTableDataSource(productsSnap)
      this.products.sort = this.sort;
      this.products.filterPredicate = (data, filter)=>{
        return this.searchOnColumn.some(element=>{
          return element != 'actions' && data[element].toLowerCase().indexOf(filter) != -1;
        })
      }
      //this.products.paginator = this.paginator;
    })
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
    //  this.products.sort = this.sort;
      this.products.paginator = this.paginator;
    },3000)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
    if (this.products.paginator) {
      setTimeout(()=>{
        this.products.paginator.firstPage();
      },3000)
    }
  }
  onEdit(product){
    this.dialog.open(ProductAddComponent, {
      data : product,
      width : '100%',
      minWidth : '320px',
      maxWidth : '890px'
    })

  }
  addNewProduct(){
    this.dialog.open(ProductAddComponent)
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
        this.firestore.collection('products').doc(id).delete()
      }
    });
  }
}
