import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { Category } from '../../models/category.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  category : Observable<any[]>;
  product : Product;
  imgSrc :string;
  selectedImage :string="";

  productName = "";
  productCategory = "";
  productPrice = 0;
  productStock = 0;
  productColor = "";
  productId = "";
  productImage = "";

  constructor( private firestore: AngularFirestore,
               private productService : ProductsService,
               @Inject(MAT_DIALOG_DATA) public data :Product
            )
  {
    this.category = firestore.collection('category').valueChanges();
  }
  ngOnInit(): void {
    if(this.data){
      this.productName = this.data.name;
      this.productCategory = this.data.categoryName;
      this.productPrice = this.data.price;
      this.productStock = this.data.stock;
      this.productColor = this.data.categoryColor;
      this.productId = this.data.productId
      this.productImage = this.data.image;
    }
  }

//validation
  addProductForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.minLength(2)]),
    category:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    stock: new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
    color:new FormControl('')
  })
  get name(){return this.addProductForm.get('name')}
  get price(){return this.addProductForm.get('price')}
  get stock(){return this.addProductForm.get('stock')}
  get image(){return this.addProductForm.get('image')}

//add product to firestore
  onProductSave(productData)
  {
    this.product= {
      name : this.productName,
      categoryName : productData.category.name,
      categoryColor : productData.category.color,
      stock : this.productStock,
      price : this.productPrice,
      image : productData.image
    }

      this.productService.addNewProduct(this.product, this.selectedImage, this.productId)

  }

  imageFetcher(imgEvt :any){ //trigger from OnSelect
    if(imgEvt.target.files && imgEvt.target){
      this.selectedImage = imgEvt.target.files[0];
      this.productImage = this.selectedImage
    }
  }
}
