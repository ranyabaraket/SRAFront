import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-remarks',
  templateUrl: './vendor-remarks.component.html',
  styleUrls: ['./vendor-remarks.component.scss']
})
export class VendorRemarksComponent implements OnInit {
  displayData: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<VendorRemarksComponent>
  ) { }

  ngOnInit(): void {
    if (!this.data || typeof this.data === 'undefined') {
      this.displayData = 'No remarks to display';
    }
    if (this.data && typeof this.data !== 'undefined') {
      this.displayData = this.data;
    }
  }

}
