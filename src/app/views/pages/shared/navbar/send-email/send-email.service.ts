import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private httpClient: HttpClient) {

   }

   postSend(sendEmailModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/mail/contactUs`, sendEmailModel,
      {
        responseType:  'text',
      });
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
