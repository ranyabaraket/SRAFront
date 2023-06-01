import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightInfoService } from './flight-info.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss']
})
export class FlightInfoComponent implements OnInit, OnDestroy {
  numVol = null;
  loading;
  source;
  token;
  total = 0;
  settings = {
    pager: {
      display: true,
      perPage: 100
    },
    hideSubHeader: true,
    defaultStyle: false,
    attr: {
      class: 'table table-bordered table-striped'
    },
    columns: {
      numVol: {
        title: this.translate.instant('Flight number'),
        filter: false
      },
      numPnr: {
        title: this.translate.instant('Pnr number'),
        filter: false
      },
      txtChange: {
        title: this.translate.instant('Message'),
        filter: false
      }
      ,
      statTicket: {
        title: this.translate.instant('Status'),
        filter: false
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };
  sub;
  constructor(private flightInfoService: FlightInfoService,
              private toastr: ToastrService,
              private languageServise: LanguageService,
              public translate: TranslateService, ) {

  }
  ngOnDestroy(): void {
    if ( this.sub)
    {this.sub.unsubscribe(); }
  }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }
  find() {
    this.loading = true;
    if (this.numVol && this.numVol.length === 0){
      this.numVol = null;
    }
    this.sub = this.flightInfoService.getFlightInfo(this.numVol).subscribe(
      data => {
        this.source = data;
        this.total = this.source.length;
        this.loading = false;
      },
      error => {
        this.toastr.error(this.translate.instant(error));
        this.loading = false;
      }
    );
  }
  reset(){
    this.numVol=null;
    this.source=null;
  }

}
