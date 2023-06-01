import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private httpClient: HttpClient) { }
  getAirport(str): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/airports/bystring/` + str);
  }
  getAirLines(str): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/airlines/bystring/` + str);
  }
  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  getAirportListByPays(str): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/airports/byCountry/` + str);
  }
  getLatestSearch(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/airlines/getLastUpdate`);
  }
  getFlightAvailability(str): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/availability` , str);
  }
  getFlightDetails(priceModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/flightDetails` , priceModel);
  }

}

