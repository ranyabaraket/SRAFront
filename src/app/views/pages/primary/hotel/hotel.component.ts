import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from './hotel.service';
import { SharedHotelService } from './sharedHotel.service';
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  loadingSearch;
  latestSearch: any = [];
  constructor(
    private router: Router,
    private hotelService: HotelService,
    private sharedHotelService: SharedHotelService
  ) {
  }
 
  
  ngOnInit() {
   this.latestSearch = this.hotelService.getLatestSearch();
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
}
