import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStatusComponent } from './add-update-status.component';

describe('AddUpdateStatusComponent', () => {
  let component: AddUpdateStatusComponent;
  let fixture: ComponentFixture<AddUpdateStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
