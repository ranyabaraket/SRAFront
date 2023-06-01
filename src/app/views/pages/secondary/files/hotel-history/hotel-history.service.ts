import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelHistoryService {
  constructor(private httpClient: HttpClient) { }
  search(searchModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/QueueHotel/search` , searchModel)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  synchronize(searchModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/QueueHotel/synchronizeWithGds` , searchModel)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStatus(codeGds, voucherRef): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/QueueHotel/updateStatus` , codeGds, voucherRef)
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
