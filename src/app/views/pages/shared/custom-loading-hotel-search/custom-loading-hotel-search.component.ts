import { Component, Input, OnInit } from '@angular/core';
import { HotelSearchModel } from '../../primary/hotel/hotelSearchModel';

@Component({
  selector: 'app-custom-loading-hotel-search',
  templateUrl: './custom-loading-hotel-search.component.html',
  styleUrls: ['./custom-loading-hotel-search.component.scss']
})
export class CustomLoadingHotelSearchComponent implements OnInit {
  @Input() searchModel:HotelSearchModel = null;
  constructor() { }

  ngOnInit(): void {
    console.log(this.searchModel);
    
  }

}
