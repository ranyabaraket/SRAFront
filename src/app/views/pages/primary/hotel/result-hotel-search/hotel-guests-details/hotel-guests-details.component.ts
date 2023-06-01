import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { Toast, ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { GuestModel } from '../../guestModel';
import { HotelService } from '../../hotel.service';
import { HotelGuestsDetailsService } from './hotel-guests-details.service';

@Component({
  selector: 'app-hotel-guests-details',
  templateUrl: './hotel-guests-details.component.html',
  styleUrls: ['./hotel-guests-details.component.scss']
})
export class HotelGuestsDetailsComponent implements OnInit, AfterViewInit {
  roomsDetailsModel: any;
  checkAvailabilityResponse: any;
  roomSelection = [];
  submitted: boolean;
  loadingSearch = true;
  hotelModel = {
    indPaysTel: '',
    email: '',
    phoneNumber: '',
    agentCharge: '',
    countryTel: ''
  };
  dataModel: any;
  bookRequestModel: any = {};
  dataToConfirmReservation: any = {};
  datePipe = new DatePipe('en-US');
  roomsDetailsModel1: any;
  guest: GuestModel = new GuestModel();
  tiersName;
  callCenter;
  trUserName;
  email;
  totalCharge: any;
  invoiceModel: any;
  passengerForms;
  roomsForm;
  hotel;
  searchHotelRequest;
  roomToBook;

  datebirth  = [];
  datebirthChildren  = [];
  listNationalities;
  nationalities =  [];

  typesAdult =[];
  indexTel =  "+213";
  lpays = 'DZ';
  indexTel1;
  pays = {
    lpays: "Algeria"
  };
  countryindex = {
   lpays : "Algeria"
  };
  
  show=false;


  checked=false;
  passengerForm;
  isDisabled: boolean = true;

  constructor(
    private hotelService: HotelService, private router: Router,
    private hotelGuestsDetailsService: HotelGuestsDetailsService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private currencyPipe: CustomCurrencyPipe,
    private toast: ToastrService,
    private cookie: CookieService) { }

  format(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.getPays();
    this.guest.agentCharge = 0;

    
    this.tiersName = this.cookie.get('tiersName');
    this.callCenter = this.cookie.get('callCenter');
    this.email = this.cookie.get('email');
    this.roomsDetailsModel = JSON.parse(localStorage.getItem('guestDetailsModel'));
    this.roomsDetailsModel1 = JSON.parse(localStorage.getItem('roomsDetailsModel'));
    this.checkAvailabilityResponse = JSON.parse(localStorage.getItem('checkAvailabilityResponse'));
    this.roomToBook = JSON.parse(localStorage.getItem('roomToBook'));
    console.log("roomTobook",this.roomToBook);
    this.guest.totalCharge = Number(this.roomToBook.price.amount);

    
  
    console.log("checkAvailabilityResponse",this.checkAvailabilityResponse);
    this.hotel = this.roomsDetailsModel1.hotelAvailable;
    
    // tslint:disable-next-line: max-line-length

    console.log("searchHotelRequest",this.roomsDetailsModel1.searchHotelRequest);
    console.log("hotel",this.hotel);

    
    this.hotelGuestsDetailsService.getPassengerHotelBooking(this.roomsDetailsModel1.searchHotelRequest)
      .subscribe(
        data => {
          this.passengerForms = data;
          console.log("result passenger",this.passengerForms);

          
          this.roomsForm = data.rooms;
          console.log("roomsForm",this.roomsForm);
          this.loadingSearch = false;

          // this.dataModel.rooms = [this.roomsDetailsModel.roomSelected];
        }
      );
    this.roomSelection.push(this.roomToBook.name);
    this.guest.totalCharge = (this.roomToBook.price.amount);
    console.log("roomDetailsModel",this.roomsDetailsModel);
    
    // if (this.roomsDetailsModel.roomSelected.roomsCombinationsfinal.length > 0) {
    //   this.totalCharge = this.roomsDetailsModel.roomSelected.roomOptions[0].finalRate1Origin;
    //   // tslint:disable-next-line: prefer-for-of
    //   for (let i = 0; i < this.roomsDetailsModel.roomSelected.roomsCombinationsfinal.length; i++) {
    //     const newElmnt = this.roomsDetailsModel.roomSelected.roomsCombinationsfinal[i].roomName;
    //     this.roomSelection.push(newElmnt);
    //   }
    // }
  }


  getPays() {
    this.hotelService.getPays().subscribe(
      data => {
        this.listNationalities = data;
        console.log("nationalities",this.listNationalities);
        
        // this.countrySelect = this.listNationalities[194];
        // this.searchModel.countrySelected = this.listNationalities[194];
      },
      err => console.log(err)
    );
  }
  ngAfterViewInit(): void {
    this.hotelService.changeStep(3);
  }
  amountToBePayed() {
    console.log("changed");
    console.log("totalCharge");

    console.log("agentCharge");


    
    // this.guest.totalCharge = Number(this.roomsDetailsModel.roomSelected.roomOptions[0].finalRate1Origin);
    const amnt1 = Number(this.roomToBook.price.amount);
    const amnt2 = Number(this.guest.agentCharge);
    this.guest.totalCharge = amnt1 + amnt2;
  }
  reserve(clienForm) {
    this.passengerForms.rooms = this.roomsForm;
    console.log("request",this.roomsForm);
    // this.submitted = true;
    // if (clienForm.invalid) {
    //   return;
    // }
    // this.bookRequestModel = this.pepareDate();

    // this.hotelGuestsDetailsService.book(this.bookRequestModel)
    //   .subscribe(
    //     data => {
    //       if (data.error === null) {
    //         this.invoiceModel = data;
    //         // if (data && data.success && !data.error) {
    //         //   this.toast.success(this.translate.instant('Success'));
    //         this.router.navigate(['/pages/hotel/result/confirm-reservation'], {});
    //         localStorage.setItem('invoiceModel', JSON.stringify(this.invoiceModel));
    //         localStorage.setItem('passengerHotelBooking', JSON.stringify(this.bookRequestModel.passengerHotelBooking));
    //       }
    //        else {
    //         this.toast.error(data.error);
    //       }
    //     }, err => this.toast.error(err)
    //   );
    // this.hotelService.changeStep(4);
  }
  generateVoucher(clienForm) {
    this.passengerForms.rooms = this.roomsForm;
    console.log("request",this.roomsForm);
    
    // this.submitted = true;

    // if (clienForm.invalid) {
    //   return;
    // }
    // this.bookRequestModel = this.pepareDate();
    // this.hotelGuestsDetailsService.book(this.bookRequestModel)
    //   .subscribe(
    //     data => {
    //       if (data.success === true) {
    //         this.hotelService.generateInvoice(data).subscribe(
    //           data1 => {
    //             if (data1) {
    //             if (data1.success === true) {
    //               this.toast.success(this.translate.instant('Voucher issued with success'), this.translate.instant('SUCCESS'));
    //             }
    //             if (data.success === false) {
    //               this.toast.warning(this.translate.instant('Can not issue the voucher'), this.translate.instant('ERROR'));
    //             }
    //           }
    //           }
    //         );
    //       }
    //     }, err => this.toast.error(err)
    //   );

    // this.pepareDate();
    // this.router.navigate(['/pages/hotel/result/voucher-details'], {state: {
    // }});
    // this.hotelService.changeStep(5);
  }


  birthDateChangeAdulte(indexRoom,IndexPerson, event) {
    console.log("indexRoom",indexRoom);
    console.log("indexPerson",IndexPerson);
    
    let birthDay = new Date(event.target.value);
    this.roomsForm[0].adult[IndexPerson].age = (2022 - birthDay.getFullYear()) ;
 
  }
  birthDateChangeChild(indexRoom,IndexPerson, event) {
    console.log("indexRoom",indexRoom);
    console.log("indexPerson",IndexPerson);
    let birthDay = new Date(event.target.value);
    this.roomsForm[0].children[0].age = (2022 - birthDay.getFullYear());
    
    
  }

  
  getStringCountry(country) {
    return JSON.stringify(country);

  }

  // getIndex(){
  //   console.log("country index",this.countryindex);
    
  //   this.indexTel = JSON.parse(this.countryindex);
  //   console.log('index', this.indexTel)
  //   // console.log('pays', this.indexTel.lpays)
  //   this.indexTel1 = this.indexTel.indTelPays
  //   this.passengerForms.indTelPays = this.indexTel.indTelPays;
  //   this.passengerForms.nationality = this.indexTel.codePays;
  // }
  checkForm(passengerForm){

    this.loadingSearch= true;
    for(let i = 0;i < this.roomsForm.length; i++){
      for(let j = 0;j < this.roomsForm[i].adult.length;j++){
        this.roomsForm[i].adult[j].type = "a";
        this.roomsForm[i].adult[j].age = "30";

      }
      for(let j = 0;j < this.roomsForm[i].children.length;j++){
        this.roomsForm[i].children[j].type = "c";
        this.roomsForm[i].children[j].age = "5";

      }

    }
    console.log("check form",this.roomsForm);
    this.passengerForms.rooms = this.roomsForm;
    this.passengerForms.indTelPays = this.indexTel; 
    this.passengerForms.mntFraisAgent = this.roomToBook.price.agentMarkUp;
    if(this.lpays == 'DZ'){
      this.passengerForms.nationality = 'Algerian'
    }else{
      this.passengerForms.nationality =this.countryindex[0].nationalite;

    }


    let BookRequestModel = {};
    let availabilityModel = this.checkAvailabilityResponse;
    let hotel = this.checkAvailabilityResponse.hotel;
    let bookingModel = this.passengerForms;
    let tiersName = this.tiersName;
    BookRequestModel = {hotel,bookingModel,availabilityModel,tiersName}

    console.log("request booking",BookRequestModel);
    



    
    
    this.hotelGuestsDetailsService.book(BookRequestModel)
      .subscribe(
        data => {
          this.loadingSearch= false;

          if (data.error === null) {
            this.invoiceModel = data;
            // if (data && data.success && !data.error) {
            //   this.toast.success(this.translate.instant('Success'));
            this.router.navigate(['/pages/hotel/result/confirm-reservation'], {});
            localStorage.setItem('invoiceModel', JSON.stringify(this.invoiceModel));
            localStorage.setItem('passengerHotelBooking', JSON.stringify(this.passengerForms));
          }
           else {
            this.toast.error(data.error);
          }
        }, err => this.toast.error(err)
      );
    this.hotelService.changeStep(4);
    


    
  }

  pepareDate() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.dataModel.persons.length; i++) {
      // tslint:disable-next-line: no-conditional-assignment
      if (this.dataModel.persons[i].isChild === true) {
        this.dataModel.persons[i].type = 'C';
      }
      // tslint:disable-next-line: no-conditional-assignment
      if (this.dataModel.persons[i].isChild === false) {
        this.dataModel.persons[i].type = 'A';
      }
    }
    this.dataModel.country = this.hotelModel.countryTel;
    this.dataModel.phoneNumber = this.hotelModel.indPaysTel + this.hotelModel.phoneNumber;
    this.dataModel.mntFraisAgent = this.hotelModel.agentCharge;
    this.dataModel.email = this.hotelModel.email;
    this.dataModel.gds = this.roomsDetailsModel.hotel.gds;
    this.bookRequestModel.hotelSearchCode = this.roomsDetailsModel.hotel.hotelSearchCode;
    this.bookRequestModel.hotelSearchModel = this.roomsDetailsModel.hotelSearchModel;
    this.bookRequestModel.passengerHotelBooking = this.dataModel;
    this.bookRequestModel.passengerHotelBooking.voucherbooking = false;
    this.bookRequestModel.passengerHotelBooking.availableForBook = true;
    this.bookRequestModel.passengerHotelBooking.availableForConfirmBook = true;
    this.bookRequestModel.passengerHotelBooking.sessionID = this.roomsDetailsModel1.hotel.session;
    this.bookRequestModel.passengerHotelBooking.hotelCode = this.roomsDetailsModel1.hotel.hotelCode;
    this.bookRequestModel.passengerHotelBooking.resultIndex = this.roomsDetailsModel1.hotel.resultIndex;
    this.bookRequestModel.passengerHotelBooking.hotelCode = this.roomsDetailsModel1.hotel.hotelCode;
    this.bookRequestModel.passengerHotelBooking.hotelName = this.roomsDetailsModel1.hotel.name;
    this.bookRequestModel.passengerHotelBooking.hotelAddress = this.roomsDetailsModel1.hotel.adress;
    this.bookRequestModel.passengerHotelBooking.hotelVille = this.roomsDetailsModel1.hotelSearchModel.destinationText;
    this.bookRequestModel.passengerHotelBooking.nbRooms = this.roomsDetailsModel1.hotelSearchModel.nbRooms;
    this.bookRequestModel.passengerHotelBooking.totalAmnt = this.roomsDetailsModel.prixTotal;
    // tslint:disable-next-line: max-line-length
    this.bookRequestModel.passengerHotelBooking.locIp = this.roomsDetailsModel1.hotel.latitude + '-' + this.roomsDetailsModel1.hotel.longitude;

    return this.bookRequestModel;
  }

  checkValue(event){
    console.log(event.target.checked);
    if(event.target.checked === true){
      this.show=true;
    }else{
      this.show=false;
    }
    
  }

  onChangeNationality(event) {
    console.log("event",event.value);
    console.log("lpays after Change",this.lpays);
    
    
    this.countryindex = this.listNationalities.filter(item => item.codePays === event.value);
    this.pays.lpays= this.countryindex.lpays;
    this.indexTel = this.countryindex[0].indTelPays;

    console.log("countryindex",this.countryindex);
    

    console.log("indexTel",this.indexTel);
    
  }
  getCheck(){
    this.checked = !this.checked;
  }

}
