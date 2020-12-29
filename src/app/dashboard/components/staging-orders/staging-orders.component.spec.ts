import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagingOrdersComponent } from './staging-orders.component';

describe('StagingOrdersComponent', () => {
  let component: StagingOrdersComponent;
  let fixture: ComponentFixture<StagingOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagingOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
