import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailsHdService {

  constructor(private httpClient: HttpClient) { }
  getBookingDetails(numPnr, uniqueId, idTiers): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/MessageQueues/getBookingDetail/` + numPnr
      + '/' + uniqueId + '/' + idTiers)
      .pipe(
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
}
