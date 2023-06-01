import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AgencyProfileService {

  constructor(private httpClient: HttpClient,
              private cookie: CookieService) { }
  getRefTiers(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/reftiers/getInfo`);
  }
  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  getCities(id): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/hotels/city/bypays/` + id);
  }
  save(refTiers): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/reftiers/update` , refTiers)
      .pipe(
        catchError(this.handleError)
      );
  }
  getReftiersLogo() {
    return this.httpClient.get(`${environment.backend_url}/reftiers/logo`,
      {
        headers: {
          responseType: 'text',
          Authorization: 'Bearer ' + this.cookie.get('UserInformation')
        }
      }).toPromise();
  }
  saveLogo(logo) {
    return  this.httpClient.post(`${environment.backend_url}/reftiers/changeLogo`, logo);
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
