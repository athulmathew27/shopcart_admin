import { Injectable } from '@angular/core';
import { Product } from '../models/products.model'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable()
export class ProductsService {

  constructor(private firestore: AngularFirestore,
              private storage :AngularFireStorage) { }

  addNewProduct(productData : Product, image :any, productId){
    console.log(productId)
    if(productId){
      var filepath = `productImages/${image.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filepath);
      this.storage.upload(filepath, image).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((imgUrl)=>{
          productData.image = imgUrl
          this.firestore.collection<Product>('products').doc(productId).update(productData).then(()=>alert("New Product Added")).catch(err=>console.log(err))
        })
      })
      ).subscribe()
    }
    else{
      var filepath = `productImages/${image.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filepath);
      this.storage.upload(filepath, image).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((imgUrl)=>{
          productData.image = imgUrl
          this.firestore.collection<Product>('products').add(productData).then(()=>alert("New Product Added")).catch(err=>console.log(err))
        })
      })
      ).subscribe()
    }
  }


}
