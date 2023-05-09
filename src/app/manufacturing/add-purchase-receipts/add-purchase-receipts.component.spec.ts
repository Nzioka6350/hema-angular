import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseReceiptsComponent } from './add-purchase-receipts.component';

describe('AddPurchaseReceiptsComponent', () => {
  let component: AddPurchaseReceiptsComponent;
  let fixture: ComponentFixture<AddPurchaseReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseReceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchaseReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
