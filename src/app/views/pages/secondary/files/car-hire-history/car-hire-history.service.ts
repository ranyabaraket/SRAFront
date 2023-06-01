import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarHireHistoryService {

  constructor(private httpClient: HttpClient) { }
  find(searchModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/car-hire/queue/search` , searchModel)
      .pipe(
        catchError(this.handleError)
      );
  }
  cancelBooking(model): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(`${environment.backend_url}/car-hire/cancel/` ,
     model)
      .pipe(
        catchError(this.handleError)
      );
  }
  getBookingDetails(idfilechr): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${environment.backend_url}/car-hire/queue/getBookingDetail/` +
     idfilechr)
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
