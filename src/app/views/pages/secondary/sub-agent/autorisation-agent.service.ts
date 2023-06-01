import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorisationAgentService {

  constructor(private httpClient: HttpClient) {

  }

  getModuleB2B(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/PrmModuleB2b/get`)
      .pipe(
        catchError(this.handleError)
      );
  }
  saveAutorisation(model,idEntite,idTiers,refUser){
    return this.httpClient.post(`${environment.backend_url}/AppUserModuleB2B/add/${idEntite}/${idTiers}/${refUser}` ,model)
    .pipe(
      catchError(this.handleError)
    );
  }
  getbyIdUserTiers(idEntite,idTiers,idUserTiers): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/AppUserModuleB2B/getbyIdUserTiers/${idEntite}/${idTiers}/${idUserTiers}`)
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
