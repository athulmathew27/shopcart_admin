import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
//import { ProductAddService } from '../../services/product-add.service';
import { Product } from '../../models/products.model';
import { Category } from '../../models/category.model';
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
  constructor( private firestore: AngularFirestore,
               private productService : ProductsService,
               )
  {
    this.category = firestore.collection('category').valueChanges();
  }
  ngOnInit(): void {  }

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
      name : productData.name,
      categoryName : productData.category.name,
      categoryColor : productData.category.color,
      stock : productData.stock,
      price : productData.price,
      image : productData.image
    }
       this.productService.addNewProduct(this.product, this.selectedImage)
  }

  imageFetcher(imgEvt :any){ //trigger from OnSelect
    if(imgEvt.target.files && imgEvt.target){
      this.selectedImage = imgEvt.target.files[0];
    }
  }
}
