import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSellingCategoryComponent } from './most-selling-category.component';

describe('MostSellingCategoryComponent', () => {
  let component: MostSellingCategoryComponent;
  let fixture: ComponentFixture<MostSellingCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostSellingCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSellingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
