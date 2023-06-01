import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class weatherService {
  baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  urlSuffix = "&units=metric&APPID=abe1eb51289c21c167c66ce790c2fac3";

  constructor(private httpClient: HttpClient) { }
  getWeather(city: string): Observable<any> {
    return this.httpClient.get(this.baseWeatherURL + city + this.urlSuffix)
      .pipe(catchError(err => {
        if (err.status === 404) {
          console.log(`City ${city} not found`);
          return EMPTY
        }
      })
      );
  }
}
