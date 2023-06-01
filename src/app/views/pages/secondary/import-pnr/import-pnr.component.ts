import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ImportPnrService } from './import-pnr.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ng2-cookies';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidateActionComponent } from '../../shared/validate-action/validate-action.component';

@Component({
  selector: 'app-import-pnr',
  templateUrl: './import-pnr.component.html',
  styleUrls: ['./import-pnr.component.scss']
})
export class ImportPnrComponent implements OnInit, OnDestroy {
  source: LocalDataSource;
  loadImport;
  loadHistory;
  search;
  pnr;
  officeId;
  officeIdList = [];
  loadOfficeIdList = true;
  token;
  searchModel = { officeId: '', pnrNumber: '' };
  importPnrModel: any;
  loadCancel;
  loadOrderEticket;
  HistoryPnrModel;
  sub: any;
  sub2: any;
  sub3: any;
  constructor(
    private importPnrService: ImportPnrService,
    private toastr: ToastrService,
    private cookie: CookieService,
    private languageServise: LanguageService,
    public dialog: MatDialog,
    public translate: TranslateService) {
  }

  ngOnInit() {
    this.getGds();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.sub2) { this.sub2.unsubscribe(); }
    if (this.sub3) { this.sub3.unsubscribe(); }
  }
  getGds() {
    this.sub = this.importPnrService.getOfficeId().subscribe(
      data => {
        if (data) {
          this.officeIdList = data;
          this.loadOfficeIdList = false;
        }
      },
      err => {
        console.log(err);
        this.loadOfficeIdList = false;
      }
    );
  }
  importPnr(searchForm) {
    this.HistoryPnrModel = null;
    this.importPnrModel = null;
    this.search = true;
    if (searchForm.invalid && this.search) {
      return;
    }
    this.loadImport = true;
 //   this.searchModel.officeId = 'MEDS228WH';
    this.sub2 = this.importPnrService.importPnr(this.searchModel).subscribe(
      data => {
        this.search = false ;
        this.loadImport = false;
        if (data.errorMessage) {
          this.toastr.error(data.errorMessage);
        } else if (data.success) {
          this.importPnrModel = data;
        }

      },
      error => {
        this.toastr.error(error);
        this.loadImport = false;
        this.search = false ;
      }
    );

  }
  historyPnr(searchForm) {
    this.HistoryPnrModel = null;
    this.importPnrModel = null;
    this.search = true;
    if (searchForm.invalid) {
      return;
    }
    this.loadHistory = true;
    this.sub3 = this.importPnrService.historyPnr(this.searchModel.pnrNumber, this.searchModel.officeId, 1).subscribe(
      data => {
        this.loadHistory = false;
        if (data.errorMessage) {
          this.toastr.error(data.errorMessage);
        } else {
          this.HistoryPnrModel = data;
        }

      },
      error => {
        this.toastr.error(error);
        this.loadHistory = false;
      }
    );

  }
  cancelTicket() {
     this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to cancel this ticket?'),
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {

        this.importPnrService.cancelTicket(this.importPnrModel.uniqueId).subscribe(
          data => {
            if (data.value === 'true' || data.value === true) { this.toastr.success(this.translate.instant('Ticket Canceled')); }
            else if (data.value === false || data.value === 'false') {
              this.toastr.error(this.translate.instant('Server Error'));
            } else {
              this.toastr.error(data.value);
            }

          },
          err => { this.toastr.error(this.translate.instant(err)); this.loadCancel = false; }
        );
      }
    });
    // this.loadCancel = true;
    // this.importPnrService.cancelTicket(this.importPnrModel).subscribe(
    //   data => {
    //     this.loadCancel = false;
    //     if (data.success) {
    //       this.toastr.success('Success');
    //     } else if (data.errorMessage) {
    //       this.toastr.error(data.errorMessage);
    //     }
    //   },
    //   error => {
    //     this.toastr.error(error);
    //     this.loadCancel = false;
    //   }
    // );
  }
  orderEticket() {
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to order this ticket?'),
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.importPnrService.ticketOrder(this.importPnrModel.uniqueId,
          'CASH').subscribe(
            data => {
              if (data.value === 'true' || data.value === true) { this.toastr.success('Order E-Ticket'); }
              else if (data.value === false || data.value === 'false') {
                this.toastr.error(this.translate.instant('Server Error'));
              } else {
                this.toastr.error(data.value);
              }

            },
            err => { this.toastr.error(this.translate.instant(err)); this.loadOrderEticket = false; }
          );
      }
    });
    // this.loadOrderEticket = true;
    // this.importPnrService.orderETicket(this.importPnrModel).subscribe(
    //   data => {
    //     this.loadOrderEticket = false;
    //     if (data.success) {
    //       this.toastr.success('Success');
    //     } else if (data.errorMessage) {
    //       this.toastr.error(data.errorMessage);
    //     }

    //   },
    //   error => {
    //     this.toastr.error(error);
    //     this.loadOrderEticket = false;
    //   }
    // );
  }

}
