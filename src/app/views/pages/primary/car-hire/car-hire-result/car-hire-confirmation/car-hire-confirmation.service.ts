import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarHireConfirmationService {
  constructor(private httpClient: HttpClient) { }

getCountries() {
return this.httpClient.get('../../../../../../assets/data/countries.json');
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
getIdfPays(codePays) {
  return fetch(`${environment.backend_url}/pays/indByCode/` + codePays);
}
book(model): Observable<any> {
  return this.httpClient.post(`${environment.backend_url}/car-hire/book/`, model);
}
select(model): Observable<any> {
  return this.httpClient.post(`${environment.backend_url}/car-hire/select/`, model);
}
cancel(model): Observable<any> {
  return this.httpClient.post(`${environment.backend_url}/car-hire/cancel/`, model);
}
}
