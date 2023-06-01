import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import * as oboe from 'oboe';
import { CookieService } from 'ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }
  search(searchModel, typeFlight): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/flights/` + typeFlight, searchModel).pipe(
        catchError(this.handleError)
      );
  }
  streamSearch(searchModel, typeSearch): oboe.Oboe {
    return oboe({
      url: `${environment.backend_urllocal}/flights/AirLowFareSearch/searchTwo/` + typeSearch,
      method: 'POST',
      body: searchModel,
      headers: { Authorization: `Bearer ${this.cookie.get('UserInformation')}` },
    });
  }
  getFlightDetail(fareSourceCode): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/fligthDetail/`, fareSourceCode).pipe(
        catchError(this.handleError)
      );
  }
  getPriceDetail(fareSourceCode): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/priceDetail/`, fareSourceCode).pipe(
        catchError(this.handleError)
      );
  }
  getFareRulesDetail(fareSourceCode): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/fareRules/`, fareSourceCode).pipe(
        catchError(this.handleError)
      );
  }
  getRestrictions(searchModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/getRestrictions`, searchModel).pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Server Error`;
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }

  sendEmail(pricedItineraryToEmail): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/AirLowFareSearch/mailItenerary`, pricedItineraryToEmail,
      {
        headers: {responseType: 'text' }
      });
  }

}
