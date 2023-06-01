import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private httpClient: HttpClient) { }
  getUserInformtions(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/reftiers/getInfo`);
  }
  getProfileInformations(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/refutilisateur/getProfilDetail`);
  }
  getReftiersLogo() {
    return fetch(`${environment.backend_url}/reftiers/logo`,
      {
        headers: {
          responseType: 'text'
        }
      });
  }
}
