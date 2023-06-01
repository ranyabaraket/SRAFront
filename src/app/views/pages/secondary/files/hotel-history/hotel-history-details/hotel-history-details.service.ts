import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class HotelHistoryDetailsService {

  constructor(private httpClient: HttpClient) { }
  getBookingDetails(uniqueId, idGds, codeGds): Observable<any> {
      // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${environment.backend_url}/hotelstest/QueueHotel/getBookingDetail/` + uniqueId + '/' + idGds + '/' + codeGds
    )
      .pipe(
        catchError(this.handleError)
      );
  }
  cancellationPolicyHotel(sessionId): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/hotelstest/QueueHotel/cancellationHotel/` + sessionId);
  }
  generateInvoice(comfirmationHotelModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/generateInvoice/` , comfirmationHotelModel);
  }

  cancelHotelBooking(comfirmationHotelModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/cancelInvoice/` , comfirmationHotelModel);
  }
  getEntityLogo(){
    return   this.httpClient.get(`${environment.backend_url}/refentite/logo`);
  }
  getLogoTiers(){
    return   this.httpClient.get(`${environment.backend_url}/reftiers/logo`);
  }
  
  getEntityData(){
    return   this.httpClient.get(`${environment.backend_url}/refentite/entite`);
  }
  getIpAdresse(){
   return this.httpClient.get('https://api.ipify.org?format=json'); 
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
