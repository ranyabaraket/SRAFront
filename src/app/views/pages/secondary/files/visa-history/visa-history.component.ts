import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { LanguageService } from '../../../shared/services/language.service';
import { VisaHistoryDetailsComponent } from './visa-history-details/visa-history-details.component';
import { VisaHistoryService } from './visa-history.service';

@Component({
  selector: 'app-visa-history',
  templateUrl: './visa-history.component.html',
  styleUrls: ['./visa-history.component.scss']
})
export class VisaHistoryComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  searchModel = {
    fullName: '',
    idVisato: '',
    typeVisa: '',
    etatVisa: '',
    idPays: '',
    startDateS: null,
  };

  Statuts = {
    C: 'Cancled',
    E: 'Pending',
    B: 'Booking',
    Y: 'In Process',
    T: 'Tickted',
    R: 'Refund'
  };
  TypeVisa = {
    Y: 'Touristic',
    C: 'Business',
    F: 'conference',
    W: 'Study'
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
      uniqueId: {
        title: this.translate.instant('Unique Id'),
        filter: false,
      },

      fullName: {
        title: this.translate.instant('Full name'),
        filter: false
      },

      // birthDate: {
      //   title: this.translate.instant('Birth date'),
      //   filter: false,
      //   type: 'html',
      //   valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy')
      // },

      phoneNumber: {
        title: this.translate.instant('Phone Number'),
        filter: false
      }
      ,
      emailContact: {
        title: this.translate.instant('E-mail'),
        filter: false
      }
      ,
      lPaysFrom: {
        title: this.translate.instant('Visa from'),
        filter: false
      }
      ,
      lPaysTo: {
        title: this.translate.instant('Visa to'),
        filter: false
      }
      ,
      typeVisa: {
        title: this.translate.instant('Type visa'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.TypeVisa[value]
      },
      statusVisa: {
        title: this.translate.instant('Status'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.Statuts[value]
      },
      vsaPrixVente: {
        title: this.translate.instant('Selling price'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.currencyPipe.transform(value)
      }
      ,
      vsaCodeDev: {
        title: this.translate.instant('Curr.'),
        filter: false
      },
      dtCreate: {
        title: this.translate.instant('Created date'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy')
      }
      ,
    }
    ,
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'getVisaDetails', title: '<i class="far fa-list-alt fa-lg" title="Details"></i>' }],
      position: 'right'
    },
  };
  source = [];
  countryList: any;
  total: number;
  loading: boolean;
  loading1: boolean;
  countryFrom;
  countryTo;
  dataToSend: any;
  visaDetails: any = [];
  showDetails: boolean;

  constructor(
    private visaHistoryService: VisaHistoryService,
    private languageServise: LanguageService,
    private currencyPipe: CustomCurrencyPipe,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.visaHistoryService.getPays().subscribe(
      data => {
        this.countryList = data;
      }
    );
  }

  onChangeCountryTo(event) {
    this.searchModel.idVisato = this.countryList.find(g => g.lpays === (event.target.value)).idPays;
  }

  onChangeCountry(event) {
    this.searchModel.idPays = this.countryList.find(g => g.lpays === (event.target.value)).idPays;
  }

  find() {
    this.loading1 = true;
    this.visaHistoryService.findQueueVisa(this.searchModel).subscribe(
      data => {
        this.source = data;
        this.total = this.source.length;
        this.loading1 = false;
      },
      error => {
        //  this.loading = false;
        this.toastr.error(error);
      }
    );
  }

  reset(searchForm) {
    searchForm.reset();
    this.countryFrom = '';
    this.countryTo = '';
    this.searchModel.idVisato = '';
    this.searchModel.idPays = '';
    this.searchModel.typeVisa = '';
    this.searchModel.etatVisa = '';
  }

  getVisaDetails(event) {
    this.loading = true;
    this.visaHistoryService.findUrlSeqvisa(event.data).subscribe(
      data1 => {
        this.visaDetails.data = event.data;
        this.visaDetails.docs = data1;
        this.showDetails = true;
        this.loading = false;

        // this.dialog.open(VisaHistoryDetailsComponent, {
        //   data: this.dataToSend,
        //   width: '800px',
        //   height: 'auto',
        // });
      }
    );
  }

  cancel(ok: boolean) {
    this.showDetails = false;
  }

}
