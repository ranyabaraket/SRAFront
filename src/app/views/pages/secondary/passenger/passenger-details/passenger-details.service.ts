import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PassengerDetailsService {

  constructor(private httpClient: HttpClient) { }
  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  getIdfPays(codePays) {
    return fetch(`${environment.backend_url}/pays/indByCode/` + codePays);
  }
  save(passenger): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/passenger/update`, passenger);
  }
  getAirlines(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/airlines/`);
  }
  getCountries() {
    return this.httpClient.get('../../../../../../../assets/data/countries.json');
  }
  getMonths() {
    return this.httpClient.get('../../../../../../../assets/data/months.json');
  }
}
