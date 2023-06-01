import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommissionsService {
  constructor(private httpClient: HttpClient) { }
  getCommissions(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/commission/AppAgenceCommission/commission`)
      .pipe(
        catchError(this.handleError)
      );
  }
  delete(data): Observable<any> {
      return this.httpClient.delete(`${environment.backend_url}/commission/AppAgenceCommission/commission/` + data.id.idComm)
      .pipe(
        catchError(this.handleError)
      );
  }

  edit(data): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/commission/AppAgenceCommission/commission/` + data.id.idComm, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  add(data): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/commission/AppAgenceCommission/commission`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCommissionByCodeModule(codeModule): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/commission/AppAgenceCommission/commission/${codeModule}`)
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
