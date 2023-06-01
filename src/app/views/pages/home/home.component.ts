import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../shared/services/language.service';
import { StoreMenuService } from '../shared/services/store-menu.service';

import { Router } from '@angular/router';
import { SharedHotelService } from '../primary/hotel/sharedHotel.service';
import { HotelService } from '../primary/hotel/hotel.service';
import { SearchModel } from '../primary/flight/searchModel';
import { HotelHistoryDetailsService } from '../secondary/files/hotel-history/hotel-history-details/hotel-history-details.service';
@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchModelFlight: SearchModel = new SearchModel();
  mysidwidth: string;
  marginLeft: string;
  mainML: string;
  openSidenav = false;
  selectedModule;
  term;
  token;
  menu;
  loadingSearch;
  latestSearch: any = [];
  show=true;
  ipAdresse: any;
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private storeMenu: StoreMenuService,

    private router: Router,
    private hotelService: HotelService,
    private sharedHotelService: SharedHotelService,
    private hotelDetailsService: HotelHistoryDetailsService) {
      console.log(btoa("01254"));
  }


  ngOnInit() {


    //  this.latestSearch = this.hotelService.getLatestSearch();
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.storeMenu.StoredPrimaryMenu.subscribe(data => {
      if (data) {
        this.menu = data;
      }
    });
     this.getLastesSearch();
     this.entityData();
     this.entityLogo();
     this.tiersLogo();
     this.getIPAddress();

  }
  getLastesSearch(){
    console.log('Hi -------------------> lastest Search');

    this.hotelService.getLatestSearch().subscribe(data=>{
      this.latestSearch=data
    }, err => console.log(err))
  }

  search(searchModel) {
    this.hotelService.changeStep([0, 1]);
    this.sharedHotelService.nextMessage(searchModel);
    this.router.navigate(['/pages/hotel/result'], {
      state: {
        searchModel
      }
    });
  }

  searchFlight(searchModelFlight) {
    let searchModel=searchModelFlight;
   // this.loadingSearch = true;
    this.router.navigate(['/pages/flight/result/selection'], {
      state: {
        searchModel
      }
    });
  }
  searchTransfer1(searchModel) {
    console.log(searchModel);

    this.loadingSearch = true;
    this.router.navigate(['/pages/transfer/result/selection'], {
      state: {
        searchModel
      }
    });
  }


  getIPAddress()
  {
    // https://cors-anywhere.herokuapp.com/
    this.hotelDetailsService
.getIpAdresse()
    .subscribe((response: any) => {
      this.ipAdresse = response.ip;
      console.log("ipAdresse"+this.ipAdresse);

    });
  }


  entityData(){
    this.hotelDetailsService.getEntityData().subscribe(res =>{
      let result = JSON.parse(JSON.stringify(res));
      localStorage.setItem('entityData', JSON.stringify(result));
    })
  }
  entityLogo(){
    this.hotelDetailsService.getEntityLogo()
    .subscribe(res => {
      const result = JSON.parse(JSON.stringify(res));
      localStorage.setItem('entityLogo', JSON.stringify(result.logo));
    });
  }
  tiersLogo(){
    this.hotelDetailsService.getLogoTiers()
    .subscribe(res => {
      const result = JSON.parse(JSON.stringify(res));
      localStorage.setItem('tiersLogo', JSON.stringify(result.logo));
    });
  }




}
