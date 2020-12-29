import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../../models/category.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  name1 :string = "";
  categoryColor :string = "";
  constructor(private firestore: AngularFirestore,
              @Inject(MAT_DIALOG_DATA) public data) {              }
  ngOnInit(): void {
    if(this.data){
      this.name1 = this.data.name;
      this.categoryColor = this.data.color;
    }
  }
  onCategorySave(categoryData : Category)
  {
    this.firestore.collection<Category>('category').add(categoryData);
  }
  onUpdate(categoryData){
    this.firestore.collection('category').doc(this.data.categoryId).update(categoryData)
  }
}
