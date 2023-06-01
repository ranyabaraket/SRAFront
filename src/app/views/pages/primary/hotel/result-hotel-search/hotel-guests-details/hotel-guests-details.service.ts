import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as oboe from 'oboe';
@Injectable({
  providedIn: 'root'
})
export class HotelGuestsDetailsService {
  constructor(private httpClient: HttpClient) { }

  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }

  getCountries() {
    return this.httpClient.get('../../../../../../../assets/data/countries.json');
  }

  getMonths() {
    return this.httpClient.get('../../../../../../../assets/data/months.json');
  }

  searchPassengerByFirstName(firstName): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/passenger/byFirstName/` + firstName);
  }
  searchPassengerbyLastName(lasttName): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/passenger/byLastName/` + lasttName);
  }

  searchPassengerbyEmail(email): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/passenger/byEmail/` + email);
  }
  searchPassengerbyTel(numTel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/passenger/byNumTel/` + numTel, {});
  }

  getIdfPays(codePays) {
    return fetch(`${environment.backend_url}/pays/indByCode/` + codePays);
  }

  getPassengerHotelBooking(searchModel): Observable<any> {
    // tslint:disable-next-line: max-line-length

    var result  = this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/getPassengerHotelBooking/`, searchModel
    );
    result.subscribe(res =>{
      console.log("result from service ",res);
      
    })
    
    return result;
  }
  book(model): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/book`, model
    );
  }

  generateInvoice(model): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/generateInvoice`, model
    );
  }

  cancelBooking(model): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/cancelInvoice`, model
    );
  }

  getPassengerHotelBooking1(searchModel, hotelCodeSearch, gds): oboe.Oboe {
    return oboe({
      url: `${environment.backend_url}/hotels/HotelSearch/getPassengerHotelBooking/` + hotelCodeSearch + '/' + gds,
      method: 'POST',
      body: searchModel
    });
  }


}
