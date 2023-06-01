import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { HotelService } from '../../hotel.service';
import { HotelSearchModel } from '../../hotelSearchModel';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-hotel-room-details',
  templateUrl: './hotel-room-details.component.html',
  styleUrls: ['./hotel-room-details.component.scss']
})
export class HotelRoomDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  searchModel: any = new HotelSearchModel();
  roomsDetailsModel: any;
  roomDetailsData: any;
  loadingSearch = true;
  photos: any;
  strLimit = 600;
  strLimit1 = 40;
  showMore = false;
  showLess = true;
  showMore2 = false;
  showLess2 = true;
  description: any;
  nbStars: any;
  gds: any;
  hotelSearchCode: any;
  hotelDetailsData: any;
  eventsFilterSubject: Subject<[]> = new Subject<[]>();
  filterOepned: boolean;
  filterRooms;
  subscription: any;
  constructor(
    private hotelService: HotelService,
    private dialogRef: MatDialog,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public toaster:ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.hotelService.changeStep(2);
  }
  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });

    this.roomsDetailsModel = JSON.parse(localStorage.getItem('roomsDetailsModel'));
    this.searchModel = JSON.parse(localStorage.getItem('hotelSearchModel'));
    console.log("searchModel",this.searchModel);
    console.log("roomsDetailsModel",this.roomsDetailsModel);

    this.loadingSearch = true;
    
    this.hotelService.getHotelsRooms(this.roomsDetailsModel).subscribe(
      data => {


            
        if(data.success){
          this.hotelDetailsData = data;
          console.log("success",data.success);
          
        this.roomDetailsData = this.hotelDetailsData.rooms;

        this.filterRooms = this.hotelDetailsData.filterRooms;
        this.filterRooms.meal = "";
        this.filterRooms.name = "";
        this.filterRooms.refundable = "";
        
        console.log("hotelDetailsData", this.hotelDetailsData);
        console.log("roomDetailsData", this.roomDetailsData);

        
        this.nbStars = this.roomsDetailsModel.hotelAvailable.stars;
        
        this.gds = this.hotelDetailsData.gds;
        console.log("gds"+this.gds);
        
        this.hotelSearchCode = this.hotelDetailsData.hotelSearchCode;
        this.photos = this.hotelDetailsData.pictures;
        console.log("photos are  ", this.photos);
        
        if (data.hotelImgAndDesc != null) {
          this.description = this.hotelDetailsData.hotelImgAndDesc.description;
        }
        this.loadingSearch = false;
        setTimeout(() => {
          this.eventsFilterSubject.next(this.roomDetailsData);
        }, 500);
        }else{
          this.loadingSearch = false;
          this.toaster.warning(data.errorMsg);
        }
        
      },
    );
    // if (this.roomDetailsData)
    // {
    // }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  refreshPrice(){
    this.ngOnInit();

  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  showMore1() {
    this.strLimit = this.description.length;
    this.showMore = true;
    this.showLess = false;
  }

  

  showLess1() {
    this.strLimit = 600;
    this.showMore = false;
    this.showLess = true;

  }

  async clearMeals(){
     this.filterRooms.meal = "";
     this.filterRooms.name = "";
     this.filterRooms.refundable ="";
     let result: any = await this.hotelService.filterRoom(this.filterRooms);
     this.roomDetailsData = result;
     console.log("after clear meals",this.roomDetailsData);
     this.eventsFilterSubject.next(this.roomDetailsData);
    }

  async filter(event) {
    
    console.log(event.target.value);

    
    if(event.target.value == 0 || event.target.value ==2){
      this.filterRooms.refundable ="";
    }
    if(event.target.value == 1){
      this.filterRooms.refundable = true;
    }
   
  
    let result: any = await this.hotelService.filterRoom(this.filterRooms);
    if(event.target.value == 2){
            let noRefundableRooms = [];
      result.forEach(element => {
        if(element.notRefundable){
          noRefundableRooms.push(element);
        }
      }); 
      console.log('Refundable rooms', noRefundableRooms);
      this.roomDetailsData = noRefundableRooms;
      console.log("roomDetailsData",this.roomDetailsData);
      this.eventsFilterSubject.next(this.roomDetailsData);

    }else{
      console.log('newModel', result);
      this.roomDetailsData = result;
      console.log("roomDetailsData",this.roomDetailsData);
      this.eventsFilterSubject.next(this.roomDetailsData);
    }


   

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

  async filterMeal(event){
    console.log(event.target.value);
    if(event.target.value == 1){
      // this.filterRooms.name = "";
      this.filterRooms.meal = "";
      console.log("111",event.target.value);
      // this.loadingSearch = true;
      await this.hotelService.filterRoom(this.filterRooms).then((res: any) => {
        console.log("result after filter",res);
        this.roomDetailsData = res;
        this.eventsFilterSubject.next(this.roomDetailsData);  
        // this.loadingSearch = false;
      });
    }else{
      console.log("value of current meal ", event.target.value);

      
      // this.filterRooms.name = "";
      this.filterRooms.meal = event.target.value;
      // this.loadingSearch = true;
      await this.hotelService.filterRoom(this.filterRooms).then((res: any) => {
        console.log("result after filter",res);
        this.roomDetailsData = res;
        console.log("roomDetailsData",this.roomDetailsData);
        this.eventsFilterSubject.next(this.roomDetailsData);
        // this.loadingSearch  = false;
      });
      // this.hotelservice.saveHotelDetail(JSON.stringify(this.result));
    }
  }
  async filterName(event){
    console.log(event.target.value);
    if(event.target.value == 1){
      // this.filterRooms.meal = "";

      this.filterRooms.name = "";
      console.log("111",event.target.value);
      // this.loadingSearch = true;
      await this.hotelService.filterRoom(this.filterRooms).then((res: any) => {
        console.log(res);
        this.roomDetailsData = res;
        console.log("roomDetailsData",this.roomDetailsData);
        this.eventsFilterSubject.next(this.roomDetailsData);  
        // this.loadingSearch = false;
      });
      console.log("say hello");
    }else{
      this.filterRooms.meal = "";

      this.filterRooms.name = event.target.value;
      // this.loadingSearch = true;
      await this.hotelService.filterRoom(this.filterRooms).then((res: any) => {
        console.log(res);
        this.roomDetailsData = res;
        console.log("roomDetailsData",this.roomDetailsData);
        this.eventsFilterSubject.next(this.roomDetailsData);
        // this.loadingSearch  = false;
      });
      // this.hotelservice.saveHotelDetail(JSON.stringify(this.result));
    }
  }
  

}
