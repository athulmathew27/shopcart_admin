import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../../models/category.model';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  constructor(private firestore: AngularFirestore,) { }
  ngOnInit(): void {  }
  onCategorySave(categoryData : Category)
  {

    //this.store.dispatch(new fromCategoryAction.AddCategory(categoryData.value))
    //this.categoryService.addCategory(categoryData)
    this.firestore.collection<Category>('category').add(categoryData);
  }
}
