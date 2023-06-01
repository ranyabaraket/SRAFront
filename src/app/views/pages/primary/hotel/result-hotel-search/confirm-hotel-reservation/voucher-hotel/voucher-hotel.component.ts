import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Cookie, CookieService } from 'ng2-cookies';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { HotelService } from '../../../hotel.service';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { HotelHistoryDetailsService } from 'src/app/views/pages/secondary/files/hotel-history/hotel-history-details/hotel-history-details.service';
import { Profile } from 'src/app/views/pages/secondary/files/hotel-history/hotel-history-details/voucher/profile';
import { RefTiers } from 'src/app/views/pages/secondary/files/hotel-history/hotel-history-details/voucher/reffTiers';
import { VoucherService } from 'src/app/views/pages/secondary/files/hotel-history/hotel-history-details/voucher/voucher.service';
// import printHtmlToPDF from 'print-html-to-pdf';

@Component({
  selector: 'app-voucher-hotel',
  templateUrl: './voucher-hotel.component.html',
  styleUrls: ['./voucher-hotel.component.scss']
})
export class VoucherHotelComponent implements OnInit, AfterViewInit {

  @Input() data: any;
  @Output() backward = new EventEmitter();
  token;
  datePipe = new DatePipe('en-US');
  userInformations: RefTiers = new RefTiers();
  profileInformations: Profile = new Profile();
  tiersLogo;
  tiersName: string;
  credits: string;
  creditsLimit: string;
  callCenter: string;
  trUserName: string;
  codeDevise: string;
  showPrice: boolean;
  showIcon = true;
  entityLogo;
  adress;
  email;
  entityData;
  loading = true ;
  
  constructor(
    private voucherService: VoucherService,
    private cookie: CookieService,
    private sanitizer: DomSanitizer,
    public languageServise: LanguageService,
    private hotelDetailsService: HotelHistoryDetailsService,
    public translate: TranslateService) {

    this.tiersName = this.cookie.get('tiersName');
    this.credits = this.cookie.get('credits');
    this.creditsLimit = this.cookie.get('creditsLimit');
    this.callCenter = this.cookie.get('callCenter');
    this.trUserName = this.cookie.get('trUserName');
    this.codeDevise = this.cookie.get('codeDevise');
    this.adress = this.cookie.get('address');
    this.email = this.cookie.get('email');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('invoiceModel'));
    this.entityData = JSON.parse(localStorage.getItem('entityData'));
    this.entityLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + JSON.parse(localStorage.getItem('entityLogo')));
    this.tiersLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + JSON.parse(localStorage.getItem('tiersLogo')));
    console.log("data from invoice model",this.data);
    this.loading = false;


    

     
  }

  cancel(): void {
    this.backward.emit(false);
  }
  diffDates(a, b) {
    return Number(this.datePipe.transform(a, 'yyyymmdd'))
      - Number(this.datePipe.transform(b, 'yyyymmdd'));
  }

  showPrice1() {
    this.showPrice = !this.showPrice;
    this.showIcon = false;
  }

  showPrice11() {
    this.showPrice = !this.showPrice;
    this.showIcon = true;
  }


}
