import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellProductComponent } from './best-sell-product.component';

describe('BestSellProductComponent', () => {
  let component: BestSellProductComponent;
  let fixture: ComponentFixture<BestSellProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
