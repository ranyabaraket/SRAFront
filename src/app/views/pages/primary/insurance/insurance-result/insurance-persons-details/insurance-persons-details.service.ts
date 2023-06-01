import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InsurancePersonsDetailsService {

  constructor(private httpClient: HttpClient) { }

  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
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
  getMonths() {
    return this.httpClient.get('../../../../../../../assets/data/months.json');
  }

}
