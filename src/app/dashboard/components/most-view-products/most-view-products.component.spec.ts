import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewProductsComponent } from './most-view-products.component';

describe('MostViewProductComponent', () => {
  let component: MostViewProductsComponent;
  let fixture: ComponentFixture<MostViewProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
