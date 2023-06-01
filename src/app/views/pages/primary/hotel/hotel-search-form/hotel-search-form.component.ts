import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { HotelSearchModel } from '../hotelSearchModel';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-hotel-search-form',
  templateUrl: './hotel-search-form.component.html',
  styleUrls: ['./hotel-search-form.component.scss']
})
export class HotelSearchFormComponent implements OnInit {
  @Input() data;
  searchModel: HotelSearchModel = new HotelSearchModel();
  ageModel1 = { chAge: 3 };
  roomsModel1 = { nbAdult: 1, nbChildren: 0, childrenAgeList: [], nbRoom: 1, nbInfant: 0 };

  inputPeriodX = '';
  inputPeriod1 = new Date();
  datePipe = new DatePipe('en-US');
  nbrNuitee = 0;
  nbrNuitee1 = '';
  detailsData = [];
  ageChData = [[]];
  lengthData = 1;
  lengthModel = 1;
  elemenTemp = [];
  elemenTemp4 = [];
  searchResultList: any = [];
  start = new Date();
  ratingsX;
  filteredOptionsDestination: Observable<string[]>;
  listNationalities: any;
  token;
  inputDestination='';
  message: string;
  countrySelect;
  codePays;
  simpleDatepicker = true;
  simpleView = false;
  disabledDays = true;
  nbRoomsX;
  latestSearch: any = [];
  submitted=false;
  constructor(
    private hotelService: HotelService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public cookiesService : CookieService
  ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });

    document.getElementById('DropdownRooms').addEventListener('click', e => {
      e.stopPropagation();
    });
    this.getPays();

    if (this.data) {
      this.disabledDays = false;
      this.searchModel = this.data;
      this.inputDestination = this.data.destinationText;
      this.searchModel.checkIn = this.data.checkIn;
      this.searchModel.checkOut = this.data.checkOut;
      this.nbrNuitee = this.data.nbNights;
      this.nbrNuitee1 = '(' + this.searchModel.nbNights + 'Nights )';
      this.searchModel.nationality = this.data.nationality;
      this.inputPeriodX = this.datePipe.transform(this.data.checkIn, 'dd-MM') + ' To ' + this.datePipe.transform(this.data.checkOut, 'dd-MM-yyyy') + ' ' + this.nbrNuitee1;
      this.searchModel.countrySelected = this.data.countrySelected;
      this.searchModel.nbRooms = this.data.nbRooms;
      this.searchModel.currentDevise = this.cookiesService.get('codeDevise');
      let rooms=this.searchModel.rooms;
      // let sumAdult=rooms.reduce((a, b) => (a.nbAdult + b.nbAdult));      
      this.nbRoomsX = this.searchModel.qteADT +' Adult(s)'+ ', '+this.searchModel.nbRooms+ ' Room(s)';
      this.initializDropDownMenu();
      this.changeRating(this.data.ratings);
      

    } else {
      this.ageModel1 = { chAge: 3 };
      this.roomsModel1 = { nbAdult: 2, nbChildren: 0, childrenAgeList: [], nbRoom: 1, nbInfant: 0 };
      this.detailsData.push(this.roomsModel1);
      this.ageChData[0].push(this.ageModel1);
      this.ageChData[0].splice(this.detailsData[0].nbChildren);
      this.ratingsX = this.translate.instant('All hotels');
      this.searchModel.nationality = 'SA';
      this.searchModel.ratings = 0;
      console.log(this.searchModel.ratings);
      
      this.searchModel.nbRooms = 1;
      this.searchModel.qteADT = 0;
      this.searchModel.qteCHD = 0;
      this.searchModel.currentDevise = this.cookiesService.get('codeDevise');
     

      // this.nbRoomsX = '1 room';
      this.changeRoomsTxt();
    }
  }

  initializDropDownMenu() {
    document.getElementById('DropdownRooms').addEventListener('click', e => {
      e.stopPropagation();
    });
    
    // // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.searchModel.rooms.length; i++) {
      this.roomsModel1 = {
        nbAdult: this.searchModel.rooms[i].nbAdult, nbChildren: this.searchModel.rooms[i].nbChildren,
        childrenAgeList: this.searchModel.rooms[i].childrenAgeList, nbRoom: 1, nbInfant: this.searchModel.rooms[i].nbInfant
      };
      this.detailsData.push(this.roomsModel1);
      const element = [];
      for (let j = 0; j < this.searchModel.rooms[i].childrenAgeList.length; j++) {
        this.ageModel1 = { chAge: this.detailsData[i].childrenAgeList[j] };
        element.push(this.ageModel1);
      }
      this.ageChData[i] = element;
    }
  }

  getDestinationFrom(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsDestination = this.hotelService.getDestination(event.target.value);
    }
  }

  filteredOptionsFromClear(event, user) {
    if (event) { this.searchModel.destination = event.source.value.split(' | ')[1]; }
    this.filteredOptionsDestination = new Observable<string[]>();
    this.searchModel.codeCityMR = user.codeMR;
    this.searchModel.codeCityGG = user.codeGG;
    this.searchModel.codeCityTBO = user.codeTbo;
    this.searchModel.codeCityGrn = user.codeGrn;
    this.searchModel.codeCityPx = user.codePx;

    this.searchModel.destinationText = user.code + ' - ' + user.ville;
    this.searchModel.destination = user.code;
    this.searchModel.currentDevise = this.cookiesService.get('codeDevise');

  }

  getPays() {
    this.hotelService.getPays().subscribe(
      data => {
        this.listNationalities = data;
        this.countrySelect = this.listNationalities[194];
        this.searchModel.countrySelected = this.listNationalities[194];
      },
      err => console.log(err)
    );
  }


  onChangeNationality(event) {
    this.searchModel.countrySelected = this.listNationalities.filter(item => item.codePays === event.value);
  }

  changeRating(value) {
    this.searchModel.ratings = value;
    if (Number(value) !== 0) {
      this.ratingsX = value + ' ' + this.translate.instant('stars');
    }
    if (Number(value) === 0) {
      this.ratingsX = this.translate.instant('All hotels');
    }
    console.log(this.searchModel);
    
  }

  // changeEventCheckIn(evt) {
  //   this.searchModel.checkIn = this.datePipe.transform(evt.target.value, 'yyyy-MM-dd');
  //   this.inputPeriod1 = evt.target.value;
  //   this.searchModel.nbNights = 0;
  //   this.inputPeriodX = this.datePipe.transform(evt.target.value, 'yyyy-MM-dd');
  //   this.disabledDays = false;
  // }
  changeEventCheckOut1(evt) {
    // this.searchModel.checkOut = this.datePipe.transform(evt.target.value, 'yyyy-MM-dd');
    if (this.searchModel.checkOut && this.searchModel.checkIn) {
      this.searchModel.checkIn = this.datePipe.transform(this.searchModel.checkIn , 'yyyy-MM-dd');
      this.searchModel.checkOut = this.datePipe.transform(this.searchModel.checkOut , 'yyyy-MM-dd');
      const invitedDate = this.searchModel.checkIn;      
      const invitedDate2 = this.searchModel.checkOut;
      const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
      this.searchModel.nbNights = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
      this.nbrNuitee = this.searchModel.nbNights;
      console.log(this.searchModel);
      
      // tslint:disable-next-line: max-line-length
      // this.inputPeriodX = this.datePipe.transform(this.searchModel.checkIn, 'dd/MM') + ' To ' + this.datePipe.transform(evt.target.value, 'dd/MM/yyyy') + ' ' + '(' + this.searchModel.nbNights + 'nights)';
    }
  }
  changeNights(event) {
    this.nbrNuitee = this.searchModel.nbNights;
    this.searchModel.nbNights = event.target.value;
    const tomorrow = new Date(this.searchModel.checkIn);
    const tomorrow1 = new Date(this.searchModel.checkIn);
    tomorrow.setDate(tomorrow1.getDate() + Number(event.target.value));
    // tslint:disable-next-line: max-line-length
    // this.inputPeriodX = this.datePipe.transform(this.searchModel.checkIn, 'dd/MM') + ' to ' + this.datePipe.transform(tomorrow , 'dd/MM/yyyy') + ' ' + '(' + this.searchModel.nbNights + 'nights)';
    this.searchModel.checkOut = this.datePipe.transform(tomorrow , 'yyyy-MM-dd');
   
    
  }

  onChangeRoomX() {
    this.roomsModel1 = { nbAdult: 1, nbChildren: 0, childrenAgeList: [], nbRoom: 1, nbInfant: 0 };
    this.detailsData.push(this.roomsModel1);
    this.searchModel.nbRooms = this.detailsData.length;

    // this.nbRoomsX =this.searchModel.nbRooms + ' Adults'+', '+ this.searchModel.nbRooms + ' rooms';
    this.changeRoomsTxt()

    
    // this.ageChData.length = 0;
  }
  onChangeRoomX1(i) {
    
    for (let k = i; k < this.detailsData.length; k++) {
      if (this.detailsData[k].nbChildren > 0) {
        this.ageChData[k].splice(0);
      }
    }
    this.detailsData.splice(i,i);
    this.detailsData = [...this.detailsData]
    this.searchModel.nbRooms = this.detailsData.length;
    this.changeRoomsTxt();
 

  }

  

  onChangeAdlt(j) {
    this.detailsData[j].nbAdult = this.detailsData[j].nbAdult + 1;
    this.changeRoomsTxt()
  }

  onChangeAdlt1(j) {
    this.detailsData[j].nbAdult = this.detailsData[j].nbAdult - 1;
    this.changeRoomsTxt()
  }

  changeRoomsTxt(){
    let sumAdult=this.detailsData.reduce((a, b) => ({nbAdult: a.nbAdult + b.nbAdult}));
    
    let sumRooms =this.detailsData.reduce((a, b) => ({nbRoom: a.nbRoom + b.nbRoom}));

    
  
    this.nbRoomsX =sumAdult.nbAdult + ' Adult(s)'+', '+ sumRooms.nbRoom + ' Room(s)';

    
  }
  onChangeInf(j) {
    this.detailsData[j].nbInfant = this.detailsData[j].nbInfant + 1;
  }
  onChangeInf1(j) {
    this.detailsData[j].nbInfant = this.detailsData[j].nbInfant - 1;
  }

  onChangeChildren(j) {
    this.detailsData[j].nbChildren = this.detailsData[j].nbChildren - 1;
    this.ageChData[j].splice(this.detailsData[j].nbChildren);
  }
  onChangeChildren1(j) {
    this.detailsData[j].nbChildren = this.detailsData[j].nbChildren + 1;
    const chLength = Number(this.detailsData[j].nbChildren);
    this.ageChData[j] = [];
    for (let q = 0; q < chLength; q++) {
      this.ageChData[j].push({ chAge: 3 });
    }
  }

  getSearchModel() {
    this.elemenTemp4 = [];
    this.searchModel.qteADT =0;
    this.searchModel.qteCHD =0;
    // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < this.ageChData.length; i++) {
    //   const newElmnt = cloneDeep.cloneDeep(this.ageChData[i]);
    //   this.elemenTemp.push(newElmnt);
    // }
    this.elemenTemp = { ...this.ageChData };
    for (const element of this.detailsData) {
      element.nbAdult = Number(element.nbAdult);
      console.log('nbAdult',  element.nbAdult);
      
      element.nbChildren = Number(element.nbChildren);
      this.searchModel.qteADT = this.searchModel.qteADT + element.nbAdult;
      this.searchModel.qteCHD = this.searchModel.qteCHD + element.nbChildren;
      this.elemenTemp4.push(element);
    }
    for (let k = 0; k < this.elemenTemp4.length; k++) {
      if (this.elemenTemp[k] !== undefined) {
        for (const element of this.elemenTemp[k]) {
          this.elemenTemp4[k].childrenAgeList.push(Number(element.chAge));
        }
      }
    }
    this.searchModel.rooms = this.elemenTemp4;
    this.searchModel.ratings = Number(this.searchModel.ratings);
    this.searchModel.nbRooms = Number(this.searchModel.nbRooms);

    return this.searchModel;
  }

  disableButtonSearch() {
    
    if (!this.inputDestination || !this.searchModel.checkIn || !this.searchModel.checkOut || this.nbrNuitee === 0) {
      return true;
    }

  }

  reset() {
    this.submitted =true;
    this.countrySelect = this.listNationalities[194];
    this.searchModel.countrySelected = this.listNationalities[194];
    this.ratingsX = 'All hotels';
    this.searchModel.nationality = 'SA';
    this.searchModel.ratings = 0;
    this.inputDestination = "";
    this.inputPeriodX = '';
    this.searchModel.nbNights = 1;
    this.detailsData.length = 0;
    this.ageModel1 = { chAge: 3 };
    this.roomsModel1 = { nbAdult: 1, nbChildren: 0, childrenAgeList: [], nbRoom: 1, nbInfant: 0 };
    // if ( this.detailsData.length<1){
    this.detailsData.push(this.roomsModel1);
    this.ageChData[0].push(this.ageModel1);
    this.ageChData[0].splice(this.detailsData[0].nbChildren);
    // }
    this.searchModel.checkIn = '';
    this.searchModel.checkOut = '';
    this.nbRoomsX =  this.roomsModel1.nbAdult + ' Adult(s)'+', '+   this.roomsModel1.nbRoom + ' Room(s)';

    this.onChangeRoomX1(0);
    console.log(this.searchModel.checkIn);
    
    this.room1();
  }

  room1() {
    this.searchModel.nbRooms = 1;
  }

  getSearch(item) {
    // this.submitted =true;
    this.disabledDays = false;
    this.searchModel.codeCityGG = item.city.codeGG;
    this.searchModel.codeCityMR = item.city.codeMR;
    this.searchModel.codeCityTBO = item.city.codeTbo;
    this.searchModel.codeCityGrn = item.city.codeGrn;
    this.searchModel.codeCityPx = item.city.codePx;

    this.searchModel.destination = item.city.code;
    this.inputDestination = item.destHotel;
    this.searchModel.destinationText = item.destHotel;
    this.searchModel.currentDevise = this.cookiesService.get('codeDevise');
    console.log('searchModel',this.searchModel);
    
    const date1 = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const date2 = this.datePipe.transform(item.dtCheckin, 'yyyy-MM-dd');
    if (date1 > date2){
      this.disabledDays = true;
      this.searchModel.nbNights = 0;
      this.inputPeriodX  = null;
     }else{
      this.searchModel.checkIn = item.dtCheckin;
      this.searchModel.checkOut = item.dtCheckout;
      this.searchModel.nbNights = item.nbrNuitee;
      this.nbrNuitee = item.nbrNuitee;
      // tslint:disable-next-line: max-line-length
      // this.inputPeriodX = this.datePipe.transform(item.dtCheckin, 'dd/MM') + ' To ' + this.datePipe.transform(item.dtCheckout, 'dd/MM/yyyy') + ' ' + '(' + item.nbrNuitee + 'nights)';
     }
  }




}
