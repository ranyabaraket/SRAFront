import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { CookieService } from 'ng2-cookies';
import { MatDialog } from '@angular/material/dialog';
import { ResultService } from '../../result.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FareRulesDetailsComponent } from '../../shared-flight/fare-rules-details/fare-rules-details.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { FlightService } from '../../../flight.service';
import { environment } from 'src/environments/environment';
import { FlightInfoClassesComponent } from '../flight-info-classes/flight-info-classes.component';

@Component({
  selector: 'app-flight-informations',
  templateUrl: './flight-informations.component.html',
  styleUrls: ['./flight-informations.component.scss']
})
export class FlightInformationsComponent implements OnInit, OnDestroy {
  @Input() flight;
  @Input() flightsFiltred;
  @Input() bestPriceFlight;
  @Input() loadingSearch;
  @Input() index;
  credits;
  showPriceDetails: any;
  showFlightDetails: boolean;
  priceDetails: any;
  flightDetails: any;
  loagingDetailsFlight: boolean;
  loadingSearch1 = false;
  paxName = {
    ADT: 'Adult',
    CHD: 'Child',
    CH: 'Child',
    INF: 'Child',
    IN: 'Infant',
    STU: 'Student',
    SRC: 'Senior',
    SEA: 'Seaman',
  };
  flightClasses: any;
  selectBtnClass;


  constructor(

    private toast: ToastrService,
    private currencyPipe: CustomCurrencyPipe,
    private resultService: ResultService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private cookie: CookieService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private flightService: FlightService,
    private dialogRef: MatDialog
  ) { }
  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.flight.modeReg='CASH';
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.credits = Number(this.cookie.get('creditsLimit')) + Number(this.cookie.get('credits'));
    switch (this.flight.soldeBlock) {
      case 'vert':
        this.selectBtnClass = 'btn btn-success';
        break;
      case 'rouge':
        this.selectBtnClass = 'btn btn-danger';
        break;
      case 'orange':
        this.selectBtnClass = 'btn btn-success';
        break;
      case 'bleu':
        this.selectBtnClass = 'btn btn-primary';
        break;
      default:
        this.selectBtnClass = 'btn btn-light';
        break;
    }
  }
  openFlightDetail(flight) {
    this.flightDetails = [];
    this.flightsFiltred.forEach(element => {
      if (element.fareSourceCode !== flight.fareSourceCode) {
        element.openColapse = false;
      }
    });
    this.showFlightDetails = !this.showFlightDetails;
    flight.openColapse = this.showFlightDetails;
    this.showPriceDetails = false;
    if (flight.openColapse) {
      this.loagingDetailsFlight = true;
      this.resultService.getFlightDetail(flight.fareSourceCode).subscribe(
        data => {
          if (data) {
            if (data.success) {
              this.flightDetails = data;
            }
            else {
              this.toastr.error('Error');
            }
          }
          this.loagingDetailsFlight = false;
        },
        err => console.log(err)
      );
    } else {
    }

  }
  openPriceBreakDown(flight) {
    this.priceDetails = null;
    this.flightsFiltred.forEach(element => {
      if (element.fareSourceCode !== flight.fareSourceCode) { element.openColapse = false; }
    });
    this.showPriceDetails = !this.showPriceDetails;
    flight.openColapse = this.showPriceDetails;
    this.showFlightDetails = false;
    if (this.showPriceDetails) {
      this.loagingDetailsFlight = true;
      this.resultService.getPriceDetail(flight.fareSourceCode).subscribe(
        data => {
          if (data) {
            this.priceDetails = data;
          }
          else {
            this.toastr.error('Error');
          }
          this.loagingDetailsFlight = false;
        },
        err => console.log(err)
      );
    }
  }
  openFareRulesDetails(flight) {
    this.loadingSearch1 = true;
    let fareRulesDetails;
    console.log(atob(flight.fareSourceCode));
    this.resultService.getFareRulesDetail(flight.fareSourceCode).subscribe(
      data => {
        if (data) {
          if (data) {
            fareRulesDetails = data;
            fareRulesDetails.fareRules[0].ruleDetails.forEach(element => {
              element.open = false;
            });
            this.dialog.open(FareRulesDetailsComponent, {
              data: fareRulesDetails,
              width: '800px',
              height: 'auto',
            });
          }
          else {
            this.toastr.error('Error');
          }
        }
        this.loadingSearch1 = false;
      },
      err => {
        console.log(err);
        this.loadingSearch1 = false;
      }
    );
  }
  numberOfDays(a, b) {
    const dateA = new Date(Number(a.split('/')[2]), Number(a.split('/')[1]) - 1, Number(a.split('/')[0]));
    const dateB = new Date(Number(b.split('/')[2]), Number(b.split('/')[1]) - 1, Number(b.split('/')[0]));
    const diffTime = dateA.getTime() - dateB.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  selectFligh(fareSourceCode, tktAmnt) {
    console.log("ranouch"+this.flight.soldeBlock);
    console.log(this.flight.modeReg === 'CASH')

    if (this.cookie.get('canSelect') !== 'O') {
      this.toast.warning(this.translate.instant('Action not allowed'));
      return;
    }
    if (this.flight.soldeBlock !== 'rouge' &&
       this.flight.modeReg === 'CASH' || this.flight.modeReg === 'CC') {
        const url = this.router.createUrlTree(['/pages/flight/result/passenger-details']);
        const myPopup = window.open('#' + url.toString(), '_blank');
        localStorage.setItem('fareSourceCode', JSON.stringify(fareSourceCode));

    } else {
      this.toast.warning(this.translate.instant('insufficient balance'));
      return;
    }
    //  periodical message sender
    // setTimeout(() => {
    //   const message = fareSourceCode;
    //   myPopup.postMessage(message, `${environment.front_url}`); // send the message and target URI
    // }, 6000);
    // return;
  }
  formatCurr(c) {
    return this.currencyPipe.transform(Math.round(parseFloat(c)));
  }
  // tslint:disable-next-line: ban-types
  parseCurr(c): Number {
    return parseFloat(this.currencyPipe.parse(c));
  }
  compareSoldeToPriceFlight(amount) {
    // if (Number(this.currencyPipe.parse(this.credits)) >= Number(this.currencyPipe.parse(amount))) {
    if (this.credits >= parseFloat(this.currencyPipe.parse(amount))) {
      return false;
    }
    return true;
  }
  openAvailebility(flight) {
    this.loadingSearch1 = true;
    this.flightService.getFlightAvailability(flight.fareSourceCode).subscribe(
      data => {
        this.flightClasses = data;
        this.loadingSearch1 = false;
        if (data.errors != null) {
          this.toastr.warning(this.translate.instant('No more rates'));
        }
        if (data.errors === null) {
          this.dialogRef.open(FlightInfoClassesComponent, {
            width: '1000px',
            height: 'auto',
            data: this.flightClasses
          });
        }
      }
    );
  }

}
