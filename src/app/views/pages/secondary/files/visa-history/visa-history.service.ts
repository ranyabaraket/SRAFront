import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisaHistoryService {

  constructor(private httpClient: HttpClient) { }

  findQueueVisa(refWebVisaQueueModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/visa/queueVisaController/getQueueVisa` , refWebVisaQueueModel)
      .pipe(
        catchError(this.handleError)
      );
  }

  findUrlSeqvisa(refWebVisaModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/visa/queueVisaController/getUrlDocvisa` , refWebVisaModel)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
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

  getImage(imageUrl: string): Observable<Blob> {
    const headers = new HttpHeaders({ Authorization:  `Basic ` + btoa('worldsoft:admindata') });
    return this.httpClient.get(imageUrl, { responseType: 'blob', headers});

  }

}
