import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FlightHistoryService {

  constructor(private httpClient: HttpClient) { }
  findFromDataBase(searchModel, type): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/MessageQueues/searchBookings/` + type, searchModel)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAirlines(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/flights/airlines/`);
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

  getUrlFile(imageUrl: string) {
    return this.httpClient.get(imageUrl);
  }
}
