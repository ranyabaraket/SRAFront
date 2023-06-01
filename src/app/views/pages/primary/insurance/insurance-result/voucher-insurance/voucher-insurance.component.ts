import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { InsuranceService } from '../../insurance.service';

@Component({
  selector: 'app-voucher-insurance',
  templateUrl: './voucher-insurance.component.html',
  styleUrls: ['./voucher-insurance.component.scss']
})
export class VoucherInsuranceComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedInsurance: any;
  dataToConfirmReservation: any;
  departDateTime;
  returnDateTime;
  tiersName;
  callCenter;
  passengerList: any;

  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private cookie: CookieService,
    private insuranceService: InsuranceService
  ) { }

  ngAfterViewInit(): void {
    this.insuranceService.changeStep(3);
  }

  ngOnInit(): void {
    this.tiersName = this.cookie.get('tiersName');
    this.callCenter = this.cookie.get('callCenter');
    this.selectedInsurance = JSON.parse(localStorage.getItem('confirmPurchase'));
    this.dataToConfirmReservation = JSON.parse(localStorage.getItem('dataToConfirmReservation'));

    this.passengerList = this.selectedInsurance.passengers;

    this.departDateTime = this.selectedInsurance.flights[0].departDateTime;
    if (!this.selectedInsurance.flights[0].returnDateTime) {
      this.returnDateTime = this.selectedInsurance.flights[0].departDateTime;
    } else {
      this.returnDateTime = this.selectedInsurance.flights[0].returnDateTime;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.passengerList.length; i++) {
      // tslint:disable-next-line: no-conditional-assignment
      if (this.passengerList[i].gender === 'M') {
        this.passengerList[i].gender = 'Male';
      } else {
        this.passengerList[i].gender = 'Female';
      }
    }

  }

  ngOnDestroy() {
    localStorage.removeItem('confirmPurchase');
  }

}
