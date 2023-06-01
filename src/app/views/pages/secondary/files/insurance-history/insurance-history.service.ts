import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class InsuranceHistoryService {
    constructor(private httpClient: HttpClient) { }
    getAirport(str): Observable<any> {
      return this.httpClient.get(`${environment.backend_url}/airports/bystring/` + str);
    }
    findFromDataBase(searchModel): Observable<any> {
      return this.httpClient.post(`${environment.backend_url}/insurances/QueueAssurance/search/` , searchModel)
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
