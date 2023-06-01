import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { ValidateActionComponent } from 'src/app/views/pages/shared/validate-action/validate-action.component';
import { TransferDetails } from '../../transfer-history/transfer-history-details/transfer-details';
import { CarHireHistoryService } from '../car-hire-history.service';

@Component({
  selector: 'app-car-hire-details',
  templateUrl: './car-hire-details.component.html',
  styleUrls: ['./car-hire-details.component.scss']
})
export class CarHireDetailsComponent implements OnInit {
  @Input() inputData: any;
  @Output() backward = new EventEmitter();
  loading = true;
  model: TransferDetails = new TransferDetails();
  statuts = {
    // tslint:disable-next-line:object-literal-key-quotes
    'B': 'Booked',
    // tslint:disable-next-line:object-literal-key-quotes
    'E': 'Pending',
    // tslint:disable-next-line:object-literal-key-quotes
    'C': 'Confirmed',
    // tslint:disable-next-line:object-literal-key-quotes
    'P ': 'In Process',
    // tslint:disable-next-line:object-literal-key-quotes
    'A': 'Canceled'
  };
  showVoucher: boolean;
  constructor(public languageServise: LanguageService,
              public translate: TranslateService,
              public router: Router,
              private route: ActivatedRoute,
              private carHireHistoryService: CarHireHistoryService,
              private currencyPipe: CustomCurrencyPipe,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.inputData) {
      //  this.codeDevise = this.inputData.curr;
        this.carHireHistoryService.getBookingDetails(this.inputData.idfilechr) .subscribe(data => {
            this.loading = false;
            if (!data) {
              this.toastr.warning('Error');
              return;
            }
            this.model = data;
          });
      } else {
        this.back();
        this.toastr.warning('Error');
      }
  }
  transform(m) {
    return this.currencyPipe.transform(Math.round(m));
  }
  cancel() {
    this.dialog.open(ValidateActionComponent, {
      data: 'Are you sure you want to cancel this booking?',
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.carHireHistoryService.cancelBooking({bookingId: this.model.suppRefChrfile,
          email : this.model.email, gds : this.model.gds }).subscribe(
          data => {
            this.loading = false;
            if (data) {
              this.model.etatfilechr = 'A';
              this.toastr.success(this.translate.instant('Canceled'));

            } else {
              this.toastr.warning(this.translate.instant('Server Error'));
            }
          }, err => {
            this.toastr.error(this.translate.instant(err));
            this.loading = false;
          }
        );

      }
    });
  }
  back(): void {
    this.backward.emit(false);
  }
  voucher(){
    this.showVoucher = true;
  }
  cancelSeeVoucher(ok: boolean){
    this.showVoucher = false;
  }
}
