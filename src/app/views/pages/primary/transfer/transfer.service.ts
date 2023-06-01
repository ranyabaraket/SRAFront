import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as oboe from 'oboe';
import { CookieService } from 'ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private httpClient: HttpClient,
              public cookie: CookieService, ) { }

  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }

  getTransferDestination(countryCode, type): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/transferDestination/byCountry/${countryCode}/${type}`);
  }

  getTransferDestinationFrom(airportId): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/transferDestination/byAirport/${airportId}`);
  }

  getTransferDestinationTo(resortCode): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/transferDestination/byResort/${resortCode}`);
  }

  getDestinationsByCodeCountry(countryCode): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/transfer/transferSearch/destinationsByCodeCountry/${countryCode}`);
  }
  getDestinationsFromGDSByText(text, country): oboe.Oboe {
    return oboe({
      url: `${environment.backend_url}/transfer/transferSearch/destinations/${text}/${country}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${this.cookie.get('UserInformation')}` },

    });
    /*Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/transfer/transferSearch/destinations/${text}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Credentials': 'false',
        },
      });*/
  }
  getLatestSearch(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/transfer/transferlastsearch/`);
  }
}
