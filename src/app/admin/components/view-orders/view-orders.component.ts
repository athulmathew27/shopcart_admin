import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/products.model';
import { Myorders } from '../../models/my-orders.model';
import { Orders } from '../../models/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements  OnInit, AfterViewInit {

  // orderData;
  isLoadingResults :boolean = true;
  products :MatTableDataSource<any>;
  totNum : number;
  displayColumn : string[] = ['index', 'orderId','amount','payment','address','date'];

  orderData : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterVal : number;
  filterArg : string ="";
  searchBy : string = "";
  startDate :string;
  endDate :string;
  rotateIconNow :boolean = false;
  isShowInvoice :boolean = false;
  selectedOrderData :Orders;


  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.rotateIconNow = true
    // var today = new Date();
    // var sevenDayBefore = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    // this.startDate = sevenDayBefore.toString();
    // this.endDate = today.toString();
    this.firestore.collection('orders').valueChanges({idField : 'orderId'}).subscribe(orderSnap=>{
      this.orderData = new MatTableDataSource(orderSnap)
      this.isLoadingResults  = false
    })

  }
  ngAfterViewInit() {
    setTimeout(()=>{
      this.orderData.paginator = this.paginator;
    },3000)

  }

  showInvoiceToggle(toggle){
    this.isShowInvoice = false;
  }

  filterByPreference(filterOn){
    this.rotateIconNow = false;
    this.filterArg = filterOn;

  }
  filterByDate(date){
    this.rotateIconNow = false;
    this.startDate = date.startDate;
    this.endDate = date.endDate;
  }

  resetTable(){
    this.rotateIconNow = true;
    this.filterArg = "";
    this.searchBy = "";
    // var today = new Date();
    // var sevenDayBefore = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    // this.startDate = sevenDayBefore.toString();
    // this.endDate = today.toString();
    this.startDate = "";
    this.endDate = ""
  }
  searchInTable(event : Event){

    if(event){
      this.rotateIconNow = false;
      //this.searchBy = searchBy;
    }
    else{
      this.searchBy = ""
      this.rotateIconNow = true;
    }
  }
  showInvoice(element){
    this.isShowInvoice = true;
    this.selectedOrderData = {
      delivaryAddress: element.delivaryAddress,
      orderId: element.orderId,
      paymentType: element.paymentType,
      toPay: element.toPay,
      orderPlacedTime : element.orderPlacedTime,
      userId : element.userId,
    }
  }
}
