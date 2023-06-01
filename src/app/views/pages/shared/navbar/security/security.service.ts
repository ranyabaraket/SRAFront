import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QrcodeModel } from 'src/app/views/authpage/tfa/tfa-models/QrcodeModel';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }
  // search(searchModel): Observable<any> {
  //   return this.httpClient.post(`${environment.backend_url}/hotelstest/QueueHotel/search` , searchModel)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }


  getQrcode(username:String , password :String){
    console.log(username,password);
    return this.httpClient.get<QrcodeModel>(`${environment.backend_url}/TFA/core/getqrcode/${username}/${password}`);
  }


  updateCanGenerateAndOtpMail(body){

    return this.httpClient.post<boolean>(`${environment.backend_url}/TFA/core/canGenerate`,body);
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

  getCanGenerate(request): Observable<any> {
    return this.httpClient.put<Boolean>(`${environment.backend_url}/b2b/TFA/canGenerate`,request);
  }
}
