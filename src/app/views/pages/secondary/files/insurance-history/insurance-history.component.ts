import { Component, OnInit } from '@angular/core';
import { InsuranceHistoryService } from './insurance-history.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../shared/services/language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';


@Component({
  selector: 'app-insurance-history',
  templateUrl: './insurance-history.component.html',
  styleUrls: ['./insurance-history.component.scss']
})
export class InsuranceHistoryComponent implements OnInit {

  searchModel = {
    etatFileass: '',
    numCin: '',
    uniqueId: '',
    assNom: '',
    assPrenom: '',
    numPasseport: '',
    dtCreateMin: null,
    dtCreateMax: null,
    dtStartassMax: null,
    dtStartassMin: null,
    departStationCode: null,
    departCountryCode: null,
    departureAirport: null,
    arrivalStationCode: null,
    arrivalCountryCode: null,
    arrivelAirport: null,
  };

  datePipe = new DatePipe('en-US');
  Etats = {
    A: 'Cancled',
    E: 'Pending',
    P: 'In Process',
    C: 'Confirmed',
    R: 'Refund'
  };
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
      refAssfile: {
        title: this.translate.instant('Insurance Ref.'),
        filter: false
      }
      ,
      assNom: {
        title: this.translate.instant('First name'),
        filter: false
      }
      ,
      assPrenom : {
        title: this.translate.instant('Last name'),
        filter: false,
      }
      ,
      numPasseport: {
        title: this.translate.instant('Passeport'),
        filter: false,
      }
      ,
      dtStartass: {
        title: this.translate.instant('Insurance From'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy')
      }
      // ,
      // dtEndass: {
      //   title: this.translate.instant('Insurance to'),
      //   filter: false,
      //   type: 'html',
      //   valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy')
      // }
      ,
      nbrJour: {
        title: this.translate.instant('Days'),
        filter: false,
        type: 'html',
        // valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy')
      }
      ,
      mntFacture: {
        title: this.translate.instant('Price'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.currencyPipe.transform(value)
      }
      ,
      originCode: {
        title: this.translate.instant('Curr.'),
        filter: false
      }
      ,
      etatFileass: {
        title: this.translate.instant('Status'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.Etats[value]
      }
      ,
      dtCreate: {
        title: this.translate.instant('Created date'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy')
      }
      // ,
      // editedBy: {
      //   title: this.translate.instant('User'),
      //   filter: false
      // }

    }
    ,
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'ourCustomAction', title: '<i class="far fa-list-alt action" title="Voucher"></i>' }],
      position: 'right'
    },

  };
  source = [];
  filteredOptionsFrom: Observable<string[]>;
  filteredOptionsTo: Observable<string[]>;
  inputdepartVol1;
  inputdestinationtVol1: string;
  total = 0;
  loading;
  showDetails: boolean;
  insuranceDetails;
  constructor(
    private insuranceHistoryService: InsuranceHistoryService,
    private toastr: ToastrService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private router: Router,
    private currencyPipe: CustomCurrencyPipe

  ) { }

  ngOnInit(): void {
  }

  getAirportsFrom(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsFrom = this.insuranceHistoryService.getAirport(event.target.value);
    }
  }
  getAirportsTo(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsTo = this.insuranceHistoryService.getAirport(event.target.value);
    }
  }

  filteredOptionsFromClear(event) {
    if (event) {
      this.searchModel.departStationCode = event.source.value.split('-')[2];
      this.searchModel.departCountryCode = event.source.value.split('-')[0];
      this.searchModel.departureAirport = event.source.value.split('-')[1];
    }
    this.filteredOptionsFrom = new Observable<string[]>();
  }
  filteredOptionsToClear(event) {
    if (event) {
      this.searchModel.arrivalStationCode = event.source.value.split('-')[2];
      this.searchModel.arrivalCountryCode = event.source.value.split('-')[0];
      this.searchModel.arrivelAirport = event.source.value.split('-')[1];
    }
    this.filteredOptionsTo = new Observable<string[]>();
  }

  find() {
    this.source = [] ;
    this.loading =  true;
    this.insuranceHistoryService.findFromDataBase(this.searchModel).subscribe(
      data => {
        this.loading =  false;
        this.source = data;
        this.total = this.source.length;
        this.loading = false;
      },
      err => {
        this.toastr.error(err);
        this.loading = false;
      }
    );
  }

  reset(searchForm) {
    searchForm.reset();
  }

  customOption(event) {
    if (event.action === 'ourCustomAction') {
      this.insuranceDetails = event.data;
      this.showDetails = true;
    }
  }

  cancel(ok: boolean) {
    this.showDetails = false;
  }

}
