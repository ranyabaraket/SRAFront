import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { map, switchMap } from 'rxjs/operators';
import { TransferHistoryDetailsService } from './transfer-history-details.service';
import { TransferDetails } from './transfer-details';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { ToastrService } from 'ngx-toastr';
import { ValidateActionComponent } from 'src/app/views/pages/shared/validate-action/validate-action.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-transfer-history-details',
  templateUrl: './transfer-history-details.component.html',
  styleUrls: ['./transfer-history-details.component.scss']
})
export class TransferHistoryDetailsComponent implements OnInit {
  @Input() inputData: any;
  @Output() backward = new EventEmitter();

  transferDetails: TransferDetails = new TransferDetails();

  typeLocations = {
    // tslint:disable-next-line:object-literal-key-quotes
    'A': 'Airport',
    // tslint:disable-next-line:object-literal-key-quotes
    'H': 'Hotel',
    // tslint:disable-next-line:object-literal-key-quotes
    'P': 'Port',
  };

  typeRent = {
    // tslint:disable-next-line:object-literal-key-quotes
    'T': 'Transfer',
    // tslint:disable-next-line:object-literal-key-quotes
    'L': 'Car rent',
  };

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
 // codeDevise;
  loading = true;
  showVoucher;
  constructor(public languageServise: LanguageService,
              public translate: TranslateService,
              public router: Router,
              private route: ActivatedRoute,
              private transferHistoryDetailsService: TransferHistoryDetailsService,
              private currencyPipe: CustomCurrencyPipe,
              private toastr: ToastrService,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.inputData) {
    //  this.codeDevise = this.inputData.curr;
      this.transferHistoryDetailsService.getBookingDetails(this.inputData.idfilechr) .subscribe(data => {
          this.loading = false;
          if (data.error) {
            this.toastr.warning(data.error);
            return;
          }
          this.transferDetails = data;
        });
    } else {
      this.back();
      this.toastr.warning('Error');
    }
    // this.route.paramMap.pipe(
    //   map(() => window.history.state),
    //   switchMap(res => {
    //     if (res) {
    //       this.codeDevise = res.curr;
    //       return this.transferHistoryDetailsService.getBookingDetails(res.idfilechr);
    //     } else {
    //       this.router.navigate(['/pages/files/transfer-history']);
    //     }
    //   }
    //   )
    // )
    //  .subscribe(data => {
    //     this.loading = false;
    //     if (data.error) {
    //       this.toastr.warning(data.error);
    //       return;
    //     }
    //     this.transferDetails = data;

    //   });
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }
  transform(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
  cancel() {
    this.dialog.open(ValidateActionComponent, {
      data: 'Are you sure you want to cancel this ticket?',
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.transferHistoryDetailsService.cancelBooking(this.transferDetails.idfilechr).subscribe(
          data => {
            this.loading = false;
            if (data) {
              this.transferDetails.etatfilechr = 'A';
              this.toastr.success(this.translate.instant('Transfer Cancelled'));

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
