import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewProductComponent } from './most-view-product.component';

describe('MostViewProductComponent', () => {
  let component: MostViewProductComponent;
  let fixture: ComponentFixture<MostViewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
