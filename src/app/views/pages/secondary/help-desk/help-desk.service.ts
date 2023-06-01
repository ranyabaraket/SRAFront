import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelpDeskService {

  constructor(private httpClient: HttpClient) { }
  getRequests(type): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/flights/MessageQueues/getRequests/` + type, {})
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
