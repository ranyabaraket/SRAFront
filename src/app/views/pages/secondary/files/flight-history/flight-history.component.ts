import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FlightHistoryService } from './flight-history.service';
import { LanguageService } from '../../../shared/services/language.service';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { DatePipe } from '@angular/common';
import { VendorRemarksComponent } from './vendor-remarks/vendor-remarks.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-flight-history',
  templateUrl: './flight-history.component.html',
  styleUrls: ['./flight-history.component.scss']
})
export class FlightHistoryComponent implements OnInit, OnDestroy {
  Etats = {
    A: 'Cancled',
    E: 'Pending',
    B: 'Booking',
    P: 'In Process',
    T: 'Tickted',
    R: 'Refund'
  };
  datePipe = new DatePipe('en-US');
  showDetails;
  data;
  settings = {
    hideSubHeader: true,
    defaultStyle: false,
    pager: {
      display: true,
      perPage: 100
    },
    attr: {
      class: 'table table-bordered table-striped'
    },
    columns: {
      ref: {
        title: this.translate.instant('Ref.'),
        filter: false
      }
      ,
      numPnr: {
        title: this.translate.instant('Num Pnr'),
        filter: false,
      }
      // ,
      // tiersName: {
      //   title: this.translate.instant('Client name'),
      //   filter: false,
      //   width: '150px',
      // }
      ,
      sector: {
        title: this.translate.instant('Flight'),
        filter: false,
        width: '100px',
      }
      ,
      passenger: {
        title: this.translate.instant('Passenger name'),
        filter: false
      }
      ,
      totalFare: {
        title: this.translate.instant('Selling price'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.currencyPipe.transform(Math.round(parseFloat(value)))
      }
      ,
      codeDevise: {
        title: this.translate.instant('Curr.'),
        filter: false
      }
      ,
      etat: {
        title: this.translate.instant('Etat'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.Etats[value]
      }
      ,
      tktTimelimit: {
        title: this.translate.instant('Time limit'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          try {
            return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm');
          } catch (error) {
            return value;
          }
        }
      }
      ,
      ticketedDate: {
        title: this.translate.instant('Ticketing date'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
      }
      ,
      travelDate: {
        title: this.translate.instant('Travel date'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
      },
      desc: {
        title: this.translate.instant('Description'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let str = '';
          if (row.bookingDate) {
            str += 'Booked : ' + this.datePipe.transform(row.bookingDate, 'dd/MM/yyyy HH:mm') + '<br>';
          }
          if (row.ticketedDate) {
            str += 'Ticketed : ' + this.datePipe.transform(row.ticketedDate, 'dd/MM/yyyy HH:mm') + '<br>';
          }
          if (row.canceledDate) {
            str += 'Canceled : ' + this.datePipe.transform(row.canceledDate, 'dd/MM/yyyy HH:mm') + '<br>';
          }
          return str;
        }
      }
      // ,
      // editedDate: {
      //   title: this.translate.instant('Modified date'),
      //   filter: false,
      //   type: 'html',
      //   valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
      // }
      // ,
      // editedBy: {
      //   title: this.translate.instant('Modified by'),
      //   filter: false,
      // }
    }
    ,
    // txtVendorRemarks: {
    //   title: this.translate.instant('Vendor remarks'),
    //   filter: false,
    //   valuePrepareFunction: (value) => { if (value !== null) { return '<i class="fas fa-exclamation-circle fa-lg"></i>'; } return 'No';}

    // }

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'getVendorRemarks', title: '<i class="fas fa-exclamation-circle fa-lg mr-2" title="Vendor remarks"></i>' },
      { name: 'getBookingDetails', title: '<i class="far fa-list-alt fa-lg" title="Details"></i>' }],
      position: 'right'
    },
  };
  source = [];
  searchModel = {
    etat: '0',
    ref: '',
    ticketNum: '',
    passenger: '',
    airline: '',
    domestic: '',
    numPnr: '',
    travelDateFom: null,
    travelDateTo: null,
    bookingDateFrom: null,
    bookingDateTo: null,
    ticketsForToday: false
  };
  loading: boolean;
  token;
  total = 0;
  loadSynchGds: boolean;
  loadFindfromDB: boolean;
  airlines;
  sub;
  constructor(
    private flightHistoryService: FlightHistoryService,
    private toastr: ToastrService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private router: Router,
    private currencyPipe: CustomCurrencyPipe,
    public dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.getAirlines();
  }
  getAirlines() {
    this.sub = this.flightHistoryService.getAirlines().subscribe(
      data => {
        this.airlines = data;
      },
      err => console.log(err)
    );
  }

  findFromDataBase() {
    this.loadFindfromDB = true;
    this.source = [];
    if (!this.searchModel.etat) { this.searchModel.etat = '0'; }
    this.flightHistoryService.findFromDataBase(this.searchModel, 2).subscribe(
      data => {
        this.source = data;
        this.loadFindfromDB = false;
        this.total = this.source.length;
      },
      error => {
        this.loadFindfromDB = false;
        this.toastr.error(error);
      }
    );
  }

  synchronizeWithGds() {
    this.loadSynchGds = true;
    this.searchModel.etat = '2';
    this.flightHistoryService.findFromDataBase(this.searchModel, 2).subscribe(
      data => {
        this.source = data;
        this.loadSynchGds = false;
        this.total = this.source.length;
      },
      error => {
        this.loadSynchGds = false;
        this.toastr.error(error);
      }
    );
  }
  reset(searchForm) {
    searchForm.reset();
    this.source = [];
    this.total = 0;
  }

  customOption(event) {
    if (event.action === 'getVendorRemarks') {
      this.getVendorRemarks(event);
    }
    if (event.action === 'getBookingDetails') {
      this.getBookingDetails(event);
    }
  }

  getVendorRemarks(event) {
    this.dialog.open(VendorRemarksComponent, {
      data: event.data.txtVendorRemarks,
      width: '400px',
      height: '160px',
    });
  }
  cancel(ok: boolean) {
    this.showDetails = false;
  }
  getBookingDetails(event): void {
    this.showDetails = true;
    // this.router.navigate(['/pages/files/flight-history/flight-details'], {
    this.data = {
      numPnr: event.data.numPnr,
      uniqueId: event.data.ref,
      idTiers: event.data.idTiers
    };
  }
}
