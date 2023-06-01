import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HotelSearchModel } from '../../hotelSearchModel';
import { PageEvent } from '@angular/material/paginator';
import * as oboe from 'oboe';
import { environment } from 'src/environments/environment';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { BiggerMapComponent } from './bigger-map/bigger-map.component';
import { CookieService } from 'ng2-cookies';
import * as _ from 'lodash';
import { HotelService } from '../../hotel.service';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { weatherService } from '../../../../../authpage/login-form/weather.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LabelType, Options } from 'ng5-slider';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { Input} from '@angular/core';



@Component({
  selector: 'app-selection-hotel',
  templateUrl: './selection-hotel.component.html',
  styleUrls: ['./selection-hotel.component.scss']
})

export class SelectionHotelComponent implements OnInit, AfterViewInit {

  
  @Input() eventsMapTest: Observable<[]>;

  searchModel: any = new HotelSearchModel();
  newSearchModel: HotelSearchModel = new HotelSearchModel();
  loadingSearch = true;
  token: any;
  searchResultList: any = [];
  hotelResult: any = [];
  lowValue = 0;
  highValue = 20;
  searchNbr1 = 0;
  searchNbr = 0;
  progressMode: ProgressBarMode = 'indeterminate';
  progressValue = 0;
  pageEvent;
  roomsDetailsModel: any = { searchHotelRequest: {}, hotelAvailable: {} };
  searchResultRoom: any = [];
  filterOepned: boolean;
  eventsSubject: Subject<void> = new Subject<void>();
  eventsMapSubject: Subject<[]> = new Subject<[]>();
  eventsFilterSubject: Subject<[]> = new Subject<[]>();
  rsltFtred: any = [];
  dataInput: any = {};
  openMapx = true;
  tiersName: string;
  credits: string;
  creditsLimit: string;
  callCenter: string;
  trUserName: string;
  codeDevise: string;
  page: number = 1;
  showMore: boolean = true;
  strLimit1: any = [];
  showMore2: any = [];
  showLess2: any = [];
  inputDestination: any;
  weather: string;
  city: any;
  loading : Boolean = false;
  searchResultHotel;
  hotelname;
  initSearchMinValue;
  initSearchMaxValue;

  minValue: any;
  maxValue: any;
  options: Options;
  displayProvider;
  filteredHotelNames: string[];
  selectedHotelNames = [];
  inputHotelName = ''
  resestToInitialData;
  showClearButton :Boolean= false;

// options: Options = {
//     floor: 0,
//     ceil: 500,
//     translate: (value: number, label: LabelType): string => {
//       switch (label) {
//         case LabelType.Low:
//           return this.format(value) + ' ' + this.codeDevise;
//         case LabelType.High:
//           return this.format(value) + ' ' + this.codeDevise;
//         default:
//           return this.format(value) + ' ' +  this.codeDevise;
//       }
//     }
//   };



  constructor(
    private router: Router,
    private hotelService: HotelService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public dialog: MatDialog,
    private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CustomCurrencyPipe,
    private cookie: CookieService,
    private weatherservice: weatherService,
) {
    this.tiersName = this.cookie.get('tiersName');
    this.creditsLimit = this.cookie.get('creditsLimit');
    this.callCenter = this.cookie.get('callCenter');
    this.trUserName = this.cookie.get('trUserName');
    this.codeDevise = this.cookie.get('codeDevise');
    this.displayProvider = this.cookie.get('displayProvider')
  }
  format(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
  ngAfterViewInit(): void {
    this.hotelService.changeStep(1);
  }
  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.options= {
      floor: 0,
      ceil: 1000,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return this.format(value) + ' ' + this.codeDevise;
          case LabelType.High:
            return this.format(value) + ' ' + this.codeDevise;
          default:
            return this.format(value) + ' ' +  this.codeDevise;
        }
      }
    };
    
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.searchModel) {
        console.log("ressssss",res);
        
        this.searchModel = res.searchModel;
        console.log(this.searchHotel);

        // this.searchModel.idEntiteUser
        this.searchHotel(this.searchModel);
        this.inputDestination = this.searchModel.destinationText;
        this.city  = this.searchModel.destinationText.split(" - ", 4); 
      }
      else {
        this.router.navigate(['pages/home']);
      }
    });

    this.weatherservice.getWeather(this.city[1]).subscribe(
      res => {
        console.log(res)
        this.weather =
          `Current temperature is  ${res['main'].temp}C, ` +
          `humidity: ${res['main'].humidity}%`;
      },
      err => console.log(`Can't get weather. Error code: %s, URL: %s`,
        err.message, err.url)
    );

    if (this.eventsMapTest !== undefined) {
     this.eventsMapTest.subscribe((data) => {
        console.log("data from map ",data)
      });
    }
  }

  searchHotel1(event) {
    this.loadingSearch = true;
    this.searchResultList.length = 0;
    this.searchHotel(this.searchModel);
  }

  searchHotel(searchModel) {
    this.searchNbr1 = 0;
    let gdsSearched = 0;
    this.progressMode = 'indeterminate';
    this.eventsSubject.next();
    oboe({
      url: `${environment.backend_url}/hotelstest/HotelSearch/search/`,
      method: 'POST',
      headers: { Authorization: `Bearer ${this.cookie.get('UserInformation')}` },
      body: searchModel
    })
      .node('!', resultHotelService => {
        gdsSearched++;
        if (_.isArray(resultHotelService) && resultHotelService.filters.gdss === 0) {
          return;
        }
        this.eventsMapSubject.next(this.searchResultList);
        this.eventsFilterSubject.next(this.searchResultList);
        console.log("resultHotelService is :  ", resultHotelService);
        this.searchResultHotel = resultHotelService;
        this.initSearchMaxValue =resultHotelService.filters.maxPrice;
        this.initSearchMinValue = resultHotelService.filters.minPrice;
        this.minValue = resultHotelService.filters.minPrice;
        this.maxValue = resultHotelService.filters.maxPrice;
        this.options.floor = this.minValue;
        this.options.ceil = this.maxValue;
          
        console.log("searchResultHotel",this.searchResultHotel);
        
        
        this.searchNbr = resultHotelService.nbHotel;
        for (let i = 0; i < resultHotelService.nbHotel; i++) {
          this.strLimit1[i] = 40;
          this.showMore2[i] = 1;
          this.showLess2[i] = 0;
        }
        console.log("this.strLimit1", this.strLimit1);


      })
      .node('{name}', objectContainName => {
        objectContainName.sendQuote = false;
        this.loadingSearch = false;
        this.progressMode = 'determinate';
        this.addAndsort(objectContainName);

      })
      .fail(err => {
        console.log(err);
        this.loadingSearch = false;
      }
      );
  }
  resetValuePrix() {
       this.minValue = this.initSearchMinValue;
        this.maxValue = this.initSearchMaxValue;
    this.filterPost();
  }
  showMore3(index) {
    this.strLimit1[index] = this.searchResultList[index].description.length;
    this.showMore2[index] = 0;
    this.showLess2[index] = 1;
  }

  showLess3(index) {
    this.strLimit1[index] = 40;
    this.showMore2[index] = 1;
    this.showLess2[index] = 0;
  }
  addAndsort(thing) {    
    if (this.searchModel.stars !== 0) {
      if (thing.stars === this.searchModel.ratings) {
        this.searchResultList.push(thing);
        this.searchNbr = this.searchResultList.length;
        this.searchNbr1 = this.searchResultList.length;
        if (this.searchResultList.length > 1) {
          this.searchResultList.sort((a, b) => {
            return a.price.amount - b.price.amount;
          });
        }
      }
    this.resestToInitialData =  this.searchResultList;

    }
    if (this.searchModel.ratings === 0) {
      this.searchResultList.push(thing);
      this.searchNbr = this.searchResultList.length;
      this.searchNbr1 = this.searchResultList.length;
      if (this.searchResultList.length > 1) {
        this.searchResultList.sort((a, b) => {
          return a.price.amount - b.price.amount;
        });
      }
      this.resestToInitialData =  this.searchResultList;

    }
  }

  async sortBy(event){
    console.log(event.target.value);
    
  
    let result: any = await this.hotelService.sortHotels(event.target.value);
    console.log("sorting Result",result);
    
  
      if (result != null) {
        this.searchNbr1 = result.length;
        this.searchResultList = result;
        this.eventsMapSubject.next(this.searchResultList);
        this.eventsFilterSubject.next(this.searchResultList);
      
    }
  }
  async filterPost() {
    this.loadingSearch = true;
    this.searchResultHotel.filters.minPrice = this.minValue;
    this.searchResultHotel.filters.maxPrice = this.maxValue;
    console.log(this.searchResultHotel.filters);

    let result: any = await this.hotelService.postFilter(this.searchResultHotel.filters);


    this.loadingSearch = false;

    if (result != null) {
      this.searchNbr1 = result.length;
      this.searchResultList = result;
      this.eventsMapSubject.next(this.searchResultList);
      this.eventsFilterSubject.next(this.searchResultList);
    }
    // if (!ok) {
    // ok = this.filterStatisticsHotel.tripAdvisor.some(e => e.check == 'active');
    // } let ok = this.filterStatisticsHotel.stars.some(e => e.check == 'active');
    //
  }
  receiveMessage(message: any) {
    console.log("data from map",message);
    let hotelFromMap = [ message ];
    this.searchResultList = hotelFromMap;
    this.searchNbr1 = this.searchResultList.length;



    // this.eventsMapSubject.next(this.searchResultList);
    this.eventsFilterSubject.next(this.searchResultList);
  }
  

  checkNbStop(index) {
    console.log("rating index",this.searchResultHotel.filters.stars[index]);
    this.searchResultHotel.filters.stars[index] = !this.searchResultHotel.filters.stars[index];
    console.log("filter before call",this.searchResultHotel.filters);
    this.filterPost(); 
  }


  async loadMore(){
    console.log("loading before",this.loading);

    this.loadingSearch = true;
    console.log("loading after",this.loading);
    
    let next: any = await this.hotelService.loadMore(this.page);
    console.log("pagenumber",next.length);
    this.page++;
    this.loadingSearch = false;

    
    if (next.hotels != null) {
      this.searchResultList = this.searchResultList.concat(next.hotels);
      this.searchNbr1=this.searchResultList.length;
      this.eventsMapSubject.next(this.searchResultList);
      this.eventsFilterSubject.next(this.searchResultList);
       /** 
         * cryte  Image Url
         * */ 
      //  this.searchResultList.forEach(element => {
      //   let img=null;
      //   element.logotxt=null;
      //   if (element.logo != null || element.logo != '') {    
      //   img = this.getBase64ImageFromUrl2(element.logo)
      //     img.then((data) => {
      //       if(data){
      //         element.logotxt = data;
      //         console.log('data',element.logotxt); 
      //       }
      //     });
      //   }
      // });
    }
    if (next.hotels.length == 0) {
      this.showMore = false;
    }


  }

  filter(event) {
    this.searchResultList = event;
    this.searchNbr1 = event.length;
    this.eventsMapSubject.next(this.searchResultList);
  }

  // paginator
  public getServerData(event?: PageEvent) {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  selectHotel(hotelResult) {
    // if (this.cookie.get('canSelect') !== 'O') {
    //   this.toast.warning(this.translate.instant('Action not allowed'));
    //   return;
    // }
    this.roomsDetailsModel.searchHotelRequest = this.searchModel;    
    if(hotelResult.gds == "PX"){
      this.roomsDetailsModel.searchHotelRequest.tokenPaximum = hotelResult.token;
    }
        this.roomsDetailsModel.hotelAvailable = hotelResult;
    this.roomsDetailsModel.hotelAvailable.nationality = this.searchModel.countrySelected.nationalite;
    localStorage.setItem('roomsDetailsModel', JSON.stringify(this.roomsDetailsModel));
    localStorage.setItem('hotelSearchModel',JSON.stringify(this.searchModel))
    const url = this.router.createUrlTree(['/pages/hotel/result/room-details']);
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

  openBiggerMap() {
    this.openMapx = false;
    this.dataInput.searchResultList = this.searchResultList;
    this.dataInput.searchModel = this.searchModel;
    this.dialogRef.open(BiggerMapComponent, {
      width: '1000px',
      height: '750px',
      data: this.dataInput
    }).afterClosed().subscribe((res) => {
      this.openMapx = true;
      setTimeout(() => {
        this.eventsMapSubject.next(this.searchResultList);
      }, 500);
    });
  }
  async getBase64ImageFromUrl2(imageUrl) {
    let res, blob,img=null;

    // res = await fetch(imageUrl);
    // console.log('res', res);

    // blob = await res.blob();
    // console.log('bolb', blob);
  
    blob = await fetch(imageUrl).then(r => r.blob());
    img = this.createImageFromBlob(blob);
    return img;

  }

 

  createImageFromBlob(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => (term === '' ? this.searchResultHotel.filters.hotelsNames
      : this.searchResultHotel.filters.hotelsNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
  );


  getHotelNames(event) {
  this.selectedHotelNames.length = 0;
  this.filteredHotelNames = [];
   this.filteredHotelNames = this.searchResultHotel.filters.hotelsNames.filter(string => {
    return string.toLowerCase().includes(event.target.value.toLowerCase());
  });
   console.log("filtredHOtle",this.filteredHotelNames);
   
  }


  checkName(){
    // console.log('hotelname',this.hotelname)
    // this.searchResultHotel.filters.hotelNameToFilter = this.hotelname;
    this.searchResultHotel.filters.hotelNamesToFilter = this.selectedHotelNames;
    this.filterPost();
  }

  clearName(){
    this.selectedHotelNames = [];
    this.filteredHotelNames = [];
    this.inputHotelName = '';
    this.searchResultHotel.filters.hotelNamesToFilter = this.selectedHotelNames;
    this.hotelname = null;
    this.showClearButton = false;

    this.filterPost();

  }

  addToList(index){
    // this.inputHotelName = index;
    this.selectedHotelNames.push(index);
    this.searchResultHotel.filters.hotelNamesToFilter = this.selectedHotelNames;
    this.showClearButton = true;
    this.filterPost();
    console.log("index",this.selectedHotelNames)
  } 
  
  resetData(){    
    this.searchNbr1 = this.resestToInitialData.length;
    this.searchResultList = this.resestToInitialData;
    this.eventsMapSubject.next(this.searchResultList);
    this.eventsFilterSubject.next(this.searchResultList);

  }

  

  
}
