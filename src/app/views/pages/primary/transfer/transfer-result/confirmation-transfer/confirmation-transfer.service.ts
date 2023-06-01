import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ConfirmationTransferService {

    constructor(private httpClient: HttpClient) { }


    searchPassengerByFirstName(firstName): Observable<any> {
        return this.httpClient.get(`${environment.backend_url}/flights/passenger/byFirstName/` + firstName);
    }
    searchPassengerbyLastName(lasttName): Observable<any> {
        return this.httpClient.get(`${environment.backend_url}/flights/passenger/byLastName/` + lasttName);
    }
    searchPassengerbyNumDoc(numDoc): Observable<any> {
        return this.httpClient.get(`${environment.backend_url}/flights/passenger/byNumDoc/` + numDoc);
    }
    searchPassengerbyEmail(email): Observable<any> {
        return this.httpClient.get(`${environment.backend_url}/flights/passenger/byEmail/` + email);
    }
    searchPassengerbyTel(numTel): Observable<any> {
        return this.httpClient.post(`${environment.backend_url}/flights/passenger/byNumTel/` + numTel, {});
    }

    bookingRequest(bookingModel): Observable<any> {
        return this.httpClient.post(`${environment.backend_url}/transferSearch/booking`, bookingModel)
            .pipe(
                catchError(this.handleError)
            );
    }
    getCountries() {
        return this.httpClient.get('../../../../../../../assets/data/countries.json');
    }
    getIdfPays(codePays) {
        return fetch(`${environment.backend_url}/pays/indByCode/` + codePays);
    }
    getAirlines(): Observable<any> {
        return this.httpClient.get(`${environment.backend_url}/flights/airlines/`);
    }
    getAirport(str): Observable<any> {
        return this.httpClient.get(`${environment.backend_url}/airports/bystring/` + str);
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

