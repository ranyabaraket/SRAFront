import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { HttpClient } from '@angular/common/http';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-search-hotel-map',
  templateUrl: './search-hotel-map.component.html',
  styleUrls: ['./search-hotel-map.component.scss']
})
export class SearchHotelMapComponent implements OnInit {
  @Input() dataInput;
  @Input() dataInputX;
  mapa: Mapboxgl;
  hotels: any[];
  hotelResult;
  roomsDetailsModel: any = { hotelSearchModel: {}, hotel: {} };
  markers: Mapboxgl.Marker[] = [];
  private eventsSubscription: Subscription;
  data: any;
  @Input() events: Observable<[]>;
  @Output() messageEvent = new EventEmitter<any>();

  showData1 = false;
  showCard = false;
  tiersName: string;
  credits: string;
  creditsLimit: string;
  callCenter: string;
  trUserName: string;
  codeDevise: string;

  constructor(
    private router: Router,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<SearchHotelMapComponent>,
    public injector: Injector,
    private curencyPipe: CustomCurrencyPipe,
    private cookie: CookieService
  ) {
    this.data = this.injector.get(MAT_DIALOG_DATA, null);
    this.tiersName = this.cookie.get('tiersName');
    this.creditsLimit = this.cookie.get('creditsLimit');
    this.callCenter = this.cookie.get('callCenter');
    this.trUserName = this.cookie.get('trUserName');
    this.codeDevise = this.cookie.get('codeDevise');
  }
  format(value) {
    return this.curencyPipe.transform(Math.round(parseFloat(value)));
  }
  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });

    // this.roomsDetailsModel.hotelSearchModel = this.data.searchResultList;
    if (this.events !== undefined) {
      this.eventsSubscription = this.events.subscribe((data) => {
        this.mapCheck1(data);
      });
    }
    if (this.dataInputX !== null && this.dataInputX !== undefined) {
      this.roomsDetailsModel.hotelSearchModel = this.dataInputX.searchModel;
      this.mapCheck11(this.data.searchResultList);
    }
    
  }

  mapCheck1(data) {
    this.showData1 = false;
    if (data === undefined || data === null || data.length === 0) {
      return;
    }
    if (this.mapa === undefined) {
      Mapboxgl.accessToken = environment.mapboxkey;
      this.mapa = new Mapboxgl.Map({
        container: 'map-mapbox',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [data[0].longitude, data[0].lattitude],
        zoom: 10.75
      });
      this.mapa.addControl(new Mapboxgl.NavigationControl());
      //    this.mapa.addControl(new Mapboxgl.FullscreenControl());
    }
    this.clearMarkers();
    this.mapa.flyTo({
      center: [data[0].longitude, data[0].lattitude],
      essential: true
    });
    this.createMarker(data);
  }

  mapCheck11(data) {
    this.showData1 = true;
    if (data === undefined || data === null || data.length === 0) {
      return;
    }
    if (this.mapa === undefined) {
      Mapboxgl.accessToken = environment.mapboxkey;
      this.mapa = new Mapboxgl.Map({
        container: 'map-mapbox1',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [data[0].longitude, data[0].lattitude],
        zoom: 10.75
      });
      this.mapa.addControl(new Mapboxgl.NavigationControl());
      //   this.mapa.addControl(new Mapboxgl.FullscreenControl());
    }
    this.clearMarkers();
    this.mapa.flyTo({
      center: [data[0].longitude, data[0].lattitude],
      essential: true
    });
    this.createMarker(data);
  }

  clearMarkers() {
    this.showCard = false;
    if (this.markers.length === 0) {
      return;
    }
    this.markers.forEach(element => {
      element.remove();
    });
  }

  affiche(dataToShow) {
    this.hotelResult = dataToShow;
    this.showCard = true;
  }

  createMarker(data) {  
  
    for (let i = 0; i < data.length; i++) {
      const markerElement = document.createElement('div');
      const markerIcon = document.createElement('div');
      const spanPrice = document.createElement('span');
      markerIcon.appendChild(spanPrice);
      spanPrice.innerText = this.format(data[i].price.amount) + ' '
        + this.codeDevise;
      if (data[i].ratings === 5) {
        markerIcon.setAttribute('style', 'width: 25px;height: 25px; background-color: blue ;background-image: url(https://hotel.jetcost.com/img/rating/rating-4.svg);'
          + 'background-repeat: no-repeat;background-position: 50% center;background-size: 15px; border-radius: 33%; ::after');
        spanPrice.setAttribute('style', 'width: 80px;font-weight: 700; display: block; padding-left: 3px; background-color: white;'
          + 'margin-left: 30px; border: 1px solid blue;');
      } else
        if (data[i].ratings === 4) {
          markerIcon.setAttribute('style', 'width: 25px;height: 25px; background-color: green ;background-image: url(https://hotel.jetcost.com/img/rating/rating-4.svg);'
            + 'background-repeat: no-repeat;background-position: 50% center;background-size: 15px; border-radius: 33%; ::after');
          spanPrice.setAttribute('style', 'width: 80px;font-weight: 700; display: block; padding-left: 3px; background-color: white;'
            + 'margin-left: 30px; border: 1px solid green;');
        } else
          if (data[i].ratings === 3) {
            markerIcon.setAttribute('style', 'width: 25px;height: 25px; background-color: orange ;background-image: url(https://hotel.jetcost.com/img/rating/rating-4.svg);'
              + 'background-repeat: no-repeat;background-position: 50% center;background-size: 15px; border-radius: 33%; ::after');
            spanPrice.setAttribute('style', 'width: 80px;font-weight: 700; display: block; padding-left: 3px; background-color: white;'
              + 'margin-left: 30px; border: 1px solid orange;');
          } else {
            markerIcon.setAttribute('style', 'width: 25px;height: 25px; background-color: red ;background-image: url(https://hotel.jetcost.com/img/rating/rating-4.svg);'
              + 'background-repeat: no-repeat;background-position: 50% center;background-size: 15px; border-radius: 33%; ::after');
            spanPrice.setAttribute('style', 'width: 80px;font-weight: 700; display: block; padding-left: 3px; background-color: white;'
              + 'margin-left: 30px; border: 1px solid red;');
          }
      markerElement.appendChild(markerIcon);
      const popup = new Mapboxgl.Popup().setText(
        data[i].name
      );
      const marker = new Mapboxgl.Marker(markerElement)
        .setLngLat([data[i].longitude, data[i].lattitude]);

      const element = marker.getElement();
      element.id = 'marker',
      
      element.addEventListener('click', () => {
        this.affiche(data[i]);
        this.messageEvent.emit(data[i]);
        console.log(data[i]);
        

      });
      element.addEventListener('mouseenter', () => popup.addTo(this.mapa));
      element.addEventListener('mouseleave', () => popup.remove());
      marker.setPopup(popup);
      marker.addTo(this.mapa);
  
      this.markers.push(marker);
    }
  }
 

  // selectHotel(hotelResult) {
  //   this.roomsDetailsModel.hotel = hotelResult;
  //   localStorage.setItem('roomsDetailsModel', JSON.stringify(this.roomsDetailsModel));
  //   const url = this.router.createUrlTree(['/pages/hotel/result/room-details']);
  //   window.open('#' + url.toString(), '_blank');
  // }

}

