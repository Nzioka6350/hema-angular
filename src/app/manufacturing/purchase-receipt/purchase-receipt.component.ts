import { Component } from '@angular/core';
import { AddPurchaseReceiptsComponent } from '../add-purchase-receipts/add-purchase-receipts.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BaseService } from 'src/app/base.service';
import { PurchaseRecieptsResponse } from 'src/app/interfaces/purchase_reciept';

@Component({
  selector: 'app-purchase-receipt',
  templateUrl: './purchase-receipt.component.html',
  styleUrls: ['./purchase-receipt.component.scss']
})
export class PurchaseReceiptComponent {

  purchaseReceipt: PurchaseRecieptsResponse | undefined

  addPurchaseReceipt() {
    this.dialog.open(AddPurchaseReceiptsComponent, {
      maxWidth: '700px',
      width: '100%'
    })
  }

  constructor(private dialog: MatDialog, private http: HttpClient, private base: BaseService) {
    this.getReceipts(this.base.base_uri_api + 'manufacturing/purchase-receipts', new HttpParams())
  }



  generatePDF(): void {
    this.http.get(this.base.base_uri_api + 'manufacturing/purchase-receipts/pdf/')
      .subscribe((response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      });
  }


  getReceipts(url: string, httpParams: HttpParams) {
    this.http
      .get(url, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.purchaseReceipt = response.body;
          }
        },
      });
  }
}
