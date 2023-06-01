import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportPnrService {

  constructor(private httpClient: HttpClient) { }
  getOfficeId(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/tiersgds/listOfficeId`);
  }
  importPnr(data): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/MessageQueues/importPnr`, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  historyPnr(pnrNumber, officeId, currency): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/MessageQueues/historyPnr/` + pnrNumber + '/' + officeId + '/' + currency)
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
  // orderETicket(data): Observable<any> {
  //   return this.httpClient.post(`${environment.backend_url}/flights/MessageQueues/ticketOrderAfterImport`, data)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  // cancelTicket(data): Observable<any> {
  //   return this.httpClient.post(`${environment.backend_url}/flights/MessageQueues/cancelBookingAfterImport`, data)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
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
