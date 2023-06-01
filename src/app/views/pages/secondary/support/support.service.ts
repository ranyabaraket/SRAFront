import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  constructor(private httpClient: HttpClient) { }
  search(searchModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/notification/search`, searchModel)
      .pipe(
        catchError(this.handleError)
      );
  }
  add(data): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/notification/saveTicket`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  edit(data): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/notification/editTicket`, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  delete(data): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/notification/removeTicket`, data)
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
