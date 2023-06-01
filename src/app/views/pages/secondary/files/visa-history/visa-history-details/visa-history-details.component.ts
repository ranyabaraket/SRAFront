import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VisaHistoryService } from '../visa-history.service';

@Component({
  selector: 'app-visa-history-details',
  templateUrl: './visa-history-details.component.html',
  styleUrls: ['./visa-history-details.component.scss']
})
export class VisaHistoryDetailsComponent implements OnInit {
  @Input() visaDetails2;
  @Output() backward = new EventEmitter();

  loading = false;
  visaDocseq: any;
  TypeVisa1;
  etatVisa;

  constructor(
    private visaHistoryService: VisaHistoryService,

  ) { }

  ngOnInit(): void {
    this.visaDocseq = this.visaDetails2;
    this.loading = false;

    switch (this.visaDocseq.data.typeVisa) {
      case 'C':
        this.TypeVisa1 = 'Business';
        break;
      case 'Y':
        this.TypeVisa1 = 'Touristic';
        break;
      case 'F':
        this.TypeVisa1 = 'conference';
        break;
      case 'W':
        this.TypeVisa1 = 'Study';
        break;
      default:
        this.TypeVisa1 = 'Touristic';
        break;
    }

    switch (this.visaDocseq.data.statusVisa) {
      case 'C':
        this.etatVisa = 'Cancled';
        break;
      case 'E':
        this.etatVisa = 'Pending';
        break;
      case 'B':
        this.etatVisa = 'Booking';
        break;
      case 'Y':
        this.etatVisa = 'In Process';
        break;
      case 'R':
        this.etatVisa = 'Refund';
        break;
    }
  }

  showData(item) {
    this.visaHistoryService.getImage(item).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  back(): void {
    this.backward.emit(false);
  }

}
