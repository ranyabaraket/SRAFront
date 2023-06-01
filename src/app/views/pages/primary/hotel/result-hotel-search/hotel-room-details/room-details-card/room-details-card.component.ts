import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { CheckRateConditionRequestModel } from '../../../CheckRateConditionRequestModel';
import { HotelService } from '../../../hotel.service';
import { Observable, Subscription } from 'rxjs';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { $ } from 'protractor';

@Component({
  selector: 'app-room-details-card',
  templateUrl: './room-details-card.component.html',
  styleUrls: ['./room-details-card.component.scss']
})
export class RoomDetailsCardComponent implements OnInit {
  @Input() data;
  @Input() events: Observable<[]>;

  roomDetailsData: any;
  strLimit1: any = [];
  showMore2: any = [];
  showLess2: any = [];
  roomsDetailsModel: any = { hotelSearchModel: {}, hotel: {}, roomSelected: {} };
  checkRateConditionRequestModel: CheckRateConditionRequestModel = new CheckRateConditionRequestModel();
  roomsDetailsModel1: any;
  loadingSearch = false;
  ratesNotAvailable = false;
  checkAvailabilityResponse: any = {};
  private eventsSubscription: Subscription;
  dataX: any;
  creditsLimit: any;
  finalRate: any;
  prixTotal: any = [];
  dataStringified ;
  searchModel;
  showMore = [];
  selectedGds;
  gdsTimeOffset;


  constructor(
    private router: Router,
    private cookie: CookieService,
    private hotelService: HotelService,
    private toast: ToastrService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private currencyPipe: CustomCurrencyPipe,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.creditsLimit = Number(this.cookie.get('creditsLimit')) + Number(this.cookie.get('credits'));
    this.dataStringified = JSON.parse( localStorage.getItem('roomsDetailsModel'));
    this.searchModel = this.dataStringified.searchHotelRequest;

    


    

    console.log("data",this.data);
    
    this.dataX = this.data.hotelDetailsData;
    console.log("datax",this.dataX);
    this.selectedGds = this.data.gds;
    this.gdsTimeOffset =this.data.hotelDetailsData.gdsTimeOffset
    console.log("gds selected",this.selectedGds);
    console.log("timsOffsetGds",this.gdsTimeOffset);
    

    
    this.eventsSubscription = this.events.subscribe((data) => {
      this.roomDetailsData = data;
      
      console.log("helloo::: ", this.roomDetailsData);
      // Get the offset in minutes for the local time zone
      var localOffset = new Date().getTimezoneOffset();

      // Get the offset in minutes for India (UTC+5:30)
      // var targetTz = 5.5;
      var targetTz = this.gdsTimeOffset;

      var targetOffset = -targetTz * 60;

      // Calculate the difference in hours
      var diffInHours = (targetOffset - localOffset) / 60;
      console.log("diifInHours",diffInHours);

      
    
      console.log("beforeConvertion",this.roomDetailsData);

      for(let i =0;i<this.roomDetailsData.length;i++){
        
       
        this.roomDetailsData[i].cancellationPolicies.forEach(element => {
          if(element.fromDate != null){
            let date = new Date(element.fromDate)          
          element.fromDate = this.addHours(date, diffInHours)
          element.fromDate =this.datePipe.transform(element.fromDate, 'dd-MM-yyyy hh:mm:ss')
          }
          
        });
      }
      
      for(let i =0;i<this.roomDetailsData.length;i++){
        this.roomDetailsData[i].cancellationPolicies.forEach(element => {
          if(element.toDate != null){
            let date = new Date(element.toDate)          
          element.toDate = this.addHours(date, diffInHours)
          element.toDate =this.datePipe.transform(element.toDate, 'dd-MM-yyyy hh:mm:ss')
          }
          
        });
      }
      console.log("afterConvertion",this.roomDetailsData);
      
      

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.roomDetailsData.length; i++) {
        this.showMore[i]= false;
        this.strLimit1[i] = 40;
        this.showMore2[i] = 1;
        this.showLess2[i] = 0;
        // this.prixTotal[i] = this.currencyPipe.transform(Math.round(parseFloat(this.roomDetailsData[i].roomOptions[0].finalRate1Origin)));
        // if (this.roomDetailsData[i].roomsCombinationsfinal.length > 0) {
        //   // tslint:disable-next-line: prefer-for-of
        //   for (let j = 0; j < this.roomDetailsData[i].roomsCombinationsfinal.length; j++) {
        //     if (this.roomDetailsData[i].roomsCombinationsfinal[j].roomOptions !== null) {
        //       const prixF = Number(this.roomDetailsData[i].roomsCombinationsfinal[j].roomOptions[0].finalRate1Origin);
        //       this.prixTotal[i] = this.currencyPipe.transform(Math.round(parseFloat(this.prixTotal[i]) + prixF));
        //     }
        //   }
        // }
      }
    });
    this.roomsDetailsModel1 = JSON.parse(localStorage.getItem('roomsDetailsModel'));
  }


  showMore3(index) {
    this.strLimit1[index] = this.roomDetailsData[index].description.length;
    this.showMore2[index] = 0;
    this.showLess2[index] = 1;
  }

  showLess3(index) {
    this.strLimit1[index] = 40;
    this.showMore2[index] = 1;
    this.showLess2[index] = 0;
  }

  selectRoomHotel(hotelResult, index) {
    console.log("are we here ???");
    
    this.finalRate = Number(hotelResult.price.amount);
    this.loadingSearch = true;

    this.checkRateConditionRequestModel.searchHotelRequest = this.searchModel;    
    let roomToCheck = hotelResult;
    this.checkRateConditionRequestModel.hotelAvailable = this.dataX;
    this.checkRateConditionRequestModel.hotelAvailable.rooms = [];
    this.checkRateConditionRequestModel.hotelAvailable.rooms[0]=  hotelResult;

    // this.checkRateConditionRequestModel.sessionId = this.checkRateConditionRequestModel.hotel.sessionID;
    localStorage.setItem('roomToBook',JSON.stringify(hotelResult));

    console.log("request",this.checkRateConditionRequestModel);
    // if (this.finalRate <= this.creditsLimit) {
      

    this.hotelService.getSelectRoom(this.checkRateConditionRequestModel).subscribe(
      data => {
        console.log("result check rate",data);

        if (data) {
          if (data.success) {
            
            this.checkAvailabilityResponse = data;
            // this.checkAvailabilityRoom.nationality = this.roomsDetailsModel1.hotel.nationality;
            this.router.navigate(['/pages/hotel/result/guests-details'], {});
            localStorage.setItem('guestDetailsModel', JSON.stringify(this.roomsDetailsModel));
            localStorage.setItem('checkAvailabilityResponse', JSON.stringify(this.checkAvailabilityResponse));
          }
          if (!data.success) {
            this.loadingSearch = false;
            this.ratesNotAvailable = true;
            this.toast.warning(this.translate.instant('Room are not available'), this.translate.instant('ERROR'));
          }
        }
      }
    );
    // }
    // if (this.finalRate > this.creditsLimit) {
    //   this.loadingSearch = false;
    //   this.toast.warning(this.translate.instant('insufficient balance'), this.translate.instant('ERROR'), { positionClass: 'toast-top-center' });
    // }
  }

// Add hours to a date
addHours(date: Date, hours: number): Date {
  console.log("diffHours",hours);
  
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}


}
