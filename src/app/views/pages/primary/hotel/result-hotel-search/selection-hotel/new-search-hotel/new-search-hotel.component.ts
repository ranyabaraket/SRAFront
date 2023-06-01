import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { HotelService } from '../../../hotel.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { HotelSearchModel } from '../../../hotelSearchModel';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { weatherService } from '../../../../../../authpage/login-form/weather.service';
@Component({
  selector: 'app-new-search-hotel',
  templateUrl: './new-search-hotel.component.html',
  styleUrls: ['./new-search-hotel.component.scss']
})
export class NewSearchHotelComponent implements OnInit {
  @Input() searchModel: HotelSearchModel = new HotelSearchModel();
  @Output() backward = new EventEmitter();

  inputDestination = '';
  inputPeriodX = '';
  datePipe = new DatePipe('en-US');
  nbrNuitee1 = '';
  progressMode: ProgressBarMode = 'indeterminate';
  token;
  loadingSearch = true;
  showSearchForm;
  weather: string;
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private weatherservice: weatherService) { }
  ngOnInit(): void {
    console.log(this.searchModel);
    
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.loadingSearch = false;
    this.progressMode = 'indeterminate';
    this.inputDestination = this.searchModel.destinationText;
    console.log("destination text is :: ", this.searchModel);
    const a = this.searchModel.destinationText.split(" - ", 4);
    console.log("a : ", a);
    
    console.log(a[1]);
    
    // tslint:disable-next-line: max-line-length
    this.inputPeriodX = this.datePipe.transform(this.searchModel.checkIn, 'dd/MM') + ' To ' + this.datePipe.transform(this.searchModel.checkOut, 'dd/MM/yyyy') + ' ' + '(' + this.searchModel.nbNights + 'nights)';
    this.weatherservice.getWeather(a[1]).subscribe(
      res => {
        this.weather =
          `Current temperature is  ${res['main'].temp}C, ` +
          `humidity: ${res['main'].humidity}%`;
      },
      err => console.log(`Can't get weather. Error code: %s, URL: %s`,
        err.message, err.url)
    );
  
  }

  search(searchModel) {
    this.backward.emit(this.searchModel);
  }

}
