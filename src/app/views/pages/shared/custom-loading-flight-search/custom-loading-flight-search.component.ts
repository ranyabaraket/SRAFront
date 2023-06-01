import { Component, Input, OnInit } from '@angular/core';
import { SearchModel } from '../../primary/flight/searchModel';

@Component({
  selector: 'app-custom-loading-flight-search',
  templateUrl: './custom-loading-flight-search.component.html',
  styleUrls: ['./custom-loading-flight-search.component.scss']
})
export class CustomLoadingFlightSearchComponent implements OnInit {
  @Input() searchModel:SearchModel = null;

  constructor() { }

  ngOnInit(): void {
  }

}
