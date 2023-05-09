import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReceiptComponent } from './purchase-receipt.component';

describe('PurchaseReceiptComponent', () => {
  let component: PurchaseReceiptComponent;
  let fixture: ComponentFixture<PurchaseReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
