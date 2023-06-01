import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class FlightHistoryDetailsService {

  constructor(private httpClient: HttpClient,
              private cookie: CookieService) { }
  getBookingDetails(numPnr, uniqueId): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/MessageQueues/getBookingDetail/` + numPnr
      + '/' + uniqueId)
      .pipe(
        catchError(this.handleError)
      );
  }
  getPnrHistory(numPnr, officeId): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/MessageQueues/historyPnr/` + numPnr + '/' + officeId + '/' + 0)
      .pipe(
        catchError(this.handleError)
      );
  }
  sendRequest(reqType, refRequestModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/MessageQueues/SendVoidRequest/` + reqType, refRequestModel)
      .pipe(
        catchError(this.handleError)
      );
  }
  updatetkTl(pnr, officeId): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/MessageQueues/tkTl/${pnr}/${officeId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  cancelTicket(uniqueId): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/AirRevalidate/cancelBooking/` + uniqueId)
      .pipe(
        catchError(this.handleError)
      );
  }
  ticketOrder(uniqueId, modReg): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/AirRevalidate/ticketOrder/` + uniqueId + '/' + modReg )
      .pipe(
        catchError(this.handleError)
      );
  }
  getEntityLogo(){
    return   fetch(`${environment.backend_url}/refentite/logo`,
      {
        headers: {
          responseType: 'text',
          Authorization: 'Bearer ' + this.cookie.get('UserInformation')
        }
      });
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
}
