import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthpageService {

  constructor(private httpClient: HttpClient) { }
  login(login): Observable<any> {
    return this.httpClient.post(`${environment.backend_urllocal}/b2b/login`, login)
      .pipe(
        catchError(this.handleError)
      );
  }

  loginFB(login): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/b2b/inscrit/facebook-login`, login)
      .pipe(
        catchError(this.handleError)
      );
  }
  signUp(signUp): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/b2b/inscrit/addRefInscri`, signUp)
      .pipe(
        catchError(this.handleError)
      );
  }
  signUpFB(signup): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/b2b/inscrit/facebook-signup`, signup) // check path
      .pipe(
        catchError(this.handleError)
      );
  }
  postRequest(idDemo): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/AppRequestDemo/add`, idDemo)
      .pipe(
        catchError(this.handleError)
      );
  }
  forgotPsw(forgotpsw): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/Authentification/forgetPassword`, forgotpsw
    )
      .pipe(
        catchError(this.handleError)
      );
  }
  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  getCity(idPays): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/city/bypays/` + idPays);
  }

  getCategory(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/categorie/`);
  }

  getNews(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/ads/`);
  }

  getDueAmount(idEntite: any, idTiers: any): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/VCustomerBalance/getDue/` +idEntite+ '/'+idTiers);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if (error.status !== 0) { errorMessage = error.error.message; }
      else { errorMessage = `Server Error`; }
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }

}
