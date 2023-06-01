import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { InsuranceSearchModel } from '../../insuranceSearchModel';
import { map } from 'rxjs/operators';
import { InsuranceService } from '../../insurance.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-selection-insurance',
  templateUrl: './selection-insurance.component.html',
  styleUrls: ['./selection-insurance.component.scss']
})
export class SelectionInsuranceComponent implements OnInit, AfterViewInit {

  searchModel: InsuranceSearchModel = new InsuranceSearchModel();
  step = { name: 'Selection', stepPassed: false, stepActive: false };
  nbDays1: number;
  loadingSearch = true;
  selectItem = false;
  insuranceRslt: any = [];
  insuranceRslt1: any = [];
  insuranceRsltX: any = [];
  insuranceSelect: any;
  insurancePrice: any;
  selectedItem: any;
  datatoStore: any = {};
  showSearchForm: boolean;
  passengerNbr = 0;
  chargeType: any;
  pricePerPassenger: any;
  filterOepned: boolean;
  eventsFilterSubject: Subject<[]> = new Subject<[]>();
  eventsFilterInitSubject: Subject<[]> = new Subject<[]>();
  displayFilter: boolean;
  searchNbr1 = 0;
  searchNbr = 0;
  pricePsg = false;

  constructor(
    public dialog: MatDialog,
    private toast: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private insuranceService: InsuranceService
  ) { }

  ngAfterViewInit(): void {
    this.insuranceService.changeStep(1);
  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.searchModel) {
        this.searchModel = res.searchModel;
        const invitedDate = this.searchModel.departDateTime;
        const invitedDate2 = this.searchModel.returnDateTime;
        const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
        this.nbDays1 = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
        this.search(this.searchModel);
      }
      else {
        this.router.navigate(['/pages/insurance']);
      }
    });
  }

  search(searchModel) {
    this.searchNbr1 = 0;
    this.searchNbr = 0;
    this.insuranceRslt.length = 0;
    this.insuranceRsltX.length = 0;
    this.loadingSearch = true;
    this.passengerNbr = this.searchModel.totalAdults + this.searchModel.totalChild;
    this.insuranceRslt1.length = 0;
    this.insuranceService.searchInsurance(searchModel).subscribe(
      data => {
        this.loadingSearch = false;
        if (!data[0].success){
          this.toast.error(
            this.translate.instant('Server Error'));
          return ;
        }
        this.searchNbr = data[0].totalPlansAvailable;
        this.searchNbr1 = data[0].totalPlansAvailable;
        this.insuranceRslt1.push(...data[0].availablePlans);
        if (data[0].totalPlansAvailable > 0) {
          this.addAndsort(this.insuranceRslt1);
        }
      }, err => {this.loadingSearch = false;
                 this.toast.error(this.translate.instant('Error')); }
    );
  }

  addAndsort(thing) {
    this.insuranceRslt = thing;
    if (this.insuranceRslt.length > 1) {
      this.insuranceRslt.sort((a, b) => {
        return a.totalPremiumAmount - b.totalPremiumAmount;
      });
    }
    this.selectedItem = this.insuranceRslt[0];
    // tslint:disable-next-line: no-conditional-assignment
    if (this.selectedItem.planPremiumChargeType === 'PerPassenger') {
      this.pricePsg = true;
    }
    this.insuranceRsltX = this.insuranceRslt;
    this.insuranceSelect = this.selectedItem.planTitle;
    this.insurancePrice = this.selectedItem.totalPremiumAmount + ' ' + this.selectedItem.currencyCode;
    this.displayFilter = true;
    this.pricePerPassenger = this.selectedItem.premiumAmount + ' ' + this.selectedItem.currencyCode;
    this.eventsFilterInitSubject.next(this.insuranceRsltX);
    this.loadingSearch = false;
  }

  selectInsurance(item) {
    this.chargeType = item.planPremiumChargeType;
    this.selectItem = true;
    this.selectedItem = item;
    this.insuranceSelect = item.planTitle;
    this.insurancePrice = item.totalPremiumAmount + ' ' + item.currencyCode;
    this.pricePerPassenger = item.premiumAmount + ' ' + this.selectedItem.currencyCode;

  }

  filter(event) {
    this.searchNbr1 = event.length;
    this.insuranceRslt = event;
    this.eventsFilterSubject.next(this.insuranceRslt);
  }

  confirmInsurance() {
    this.datatoStore.selectedItem = this.selectedItem;
    this.datatoStore.searchModel = this.searchModel;
    localStorage.setItem('insuranceSelected', JSON.stringify(this.datatoStore));
    const url = this.router.createUrlTree(['/pages/insurance/result/details']);
    window.open('#' + url.toString(), '_blank');
  }

  openFilter() {
    const modal = document.getElementById('filter');
    if (this.filterOepned) {
      modal.style.display = 'none';
      this.filterOepned = false;
    }
    else {
      modal.style.display = 'block';
      this.filterOepned = true;
    }
  }

  insuranceDetailsSelected(event) {
    this.selectedItem = event;
    // tslint:disable-next-line: no-conditional-assignment
    if (this.selectedItem.planPremiumChargeType === 'PerPassenger') {
      this.pricePsg = true;
    }
    // tslint:disable-next-line: no-conditional-assignment
    if (this.selectedItem.planPremiumChargeType === 'PerBooking') {
      this.pricePsg = false;
    }
    this.insuranceSelect = this.selectedItem.planTitle;
    this.insurancePrice = this.selectedItem.totalPremiumAmount + ' ' + this.selectedItem.currencyCode;
    this.pricePerPassenger = this.selectedItem.premiumAmount + ' ' + this.selectedItem.currencyCode;
  }

}
