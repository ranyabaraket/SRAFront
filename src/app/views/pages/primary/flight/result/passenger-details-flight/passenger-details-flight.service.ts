import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PassengerDetailsFlightService {

  constructor(private httpClient: HttpClient) { }
  getPassengerDetails(fareSource): Observable<any> {
    return this.httpClient.post(`${environment.backend_urllocal}/flights/AirRevalidate/passengerDetails`, fareSource);
  }
  getFlightDetails(fareSource, modeReg): Observable<any> {
    return this.httpClient.post(`${environment.backend_urllocal}/flights/AirRevalidate/airRevalidate/` + modeReg, fareSource);
  }
  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  getAirlines(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/airlines/`);
  }
  searchPassengerByFirstName(firstName): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/passenger/byFirstName/` + firstName);
  }
  searchPassengerbyLastName(lasttName): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/passenger/byLastName/` + lasttName);
  }
  searchPassengerbyNumDoc(numDoc): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/passenger/byNumDoc/` + numDoc);
  }
  searchPassengerbyEmail(email): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/passenger/byEmail/` + email);
  }
  searchPassengerbyTel(numTel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/passenger/byNumTel/` + numTel, {});
  }
  getCountries() {
    return this.httpClient.get('../../../../../../../assets/data/countries.json');
  }
  getMeals() {
    return this.httpClient.get('../../../../../../../assets/data/meals.json');
  }
  getMonths() {
    return this.httpClient.get('../../../../../../../assets/data/months.json');
  }
  getIdfPays(codePays) {
    return fetch(`${environment.backend_url}/pays/indByCode/` + codePays);
  }
  bookingFligh(bookingModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_urllocal}/flights/AirRevalidate/book`, bookingModel);
  }
  getFareRulesDetail(fareSourceCode): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/fareRules/`, fareSourceCode);
  }
}
