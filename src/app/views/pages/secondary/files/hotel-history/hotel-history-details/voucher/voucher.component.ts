import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HotelHistoryDetailsService } from '../hotel-history-details.service';
import { CookieService } from 'ng2-cookies';
import { Profile } from './profile';
import { RefTiers } from './reffTiers';
import { VoucherService } from './voucher.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
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
  constructor(
    private voucherService: VoucherService,
    private cookie: CookieService,
    private sanitizer: DomSanitizer,
    public languageServise: LanguageService,
    private hotelDetailsService: HotelHistoryDetailsService,
    public translate: TranslateService,
    public toaster : ToastrService) {

    this.tiersName = this.cookie.get('tiersName');
    this.credits = this.cookie.get('credits');
    this.creditsLimit = this.cookie.get('creditsLimit');
    this.callCenter = this.cookie.get('callCenter');
    this.trUserName = this.cookie.get('trUserName');
    this.codeDevise = this.cookie.get('codeDevise');
    this.adress = this.cookie.get('address');
  }

  ngOnInit() {
    // this.voucherService.getUserInformtions().subscribe(
    //     data => {
    //       this.userInformations = data;
    //     },
    //     err => console.log(err)
    //   );
    // this.voucherService.getProfileInformations().subscribe(
    //     data => {
    //       this.profileInformations = data;
    //     },
    //     err => console.log(err)
    //   );

    // this.hotelDetailsService.getLogoTiers()
    //   .subscribe(res => {
    //     const result = JSON.parse(JSON.stringify(res));
    //     this.entityLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + result.logo);
    //   });
    this.hotelDetailsService.getEntityLogo()
      .subscribe(res => {
        const result = JSON.parse(JSON.stringify(res));
        this.entityLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + result.logo);
      });
  }
  cancel(): void {
    this.backward.emit(false);
  }

  // async cancelBooking(){
  //   // this.loadingHot.changeLoadingHotel(true)
  //   let confirmationModel = this.detailHistory.detail
  //   confirmationModel.uniqueId = this.detailHistory.detail.pnrNumber;
  //   console.log('confirmationModel',confirmationModel)
  //   await this.hotelDetailsService.cancelHotelBooking(confirmationModel).then(res =>
  //     {
  //       console.log("res cancel",res)
  //       if(res = null){
  //         this.toaster.warning('Cancel Error')}
  //       else{
  //         this.toaster.success('Reservation annulée')
  //         // this.router.navigateByUrl('History')}
  //  } })
  
  // }
  


  

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
