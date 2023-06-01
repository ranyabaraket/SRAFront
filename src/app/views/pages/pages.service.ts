import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private httpClient: HttpClient) { }
  getSecondaryModules(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/modules/secondary`);
  }
  getNews( ): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/News/getNews`);
  }
  getPrimaryModules(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/modules/primary`);
  }
  /**getSecondaryModulesByIdEntite(idEntite): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/modules/secondary/${idEntite}`);
  }*/

  getLogo(idEntite): Observable<any>{
    return this.httpClient.get(`${environment.backend_url}/refentite/logo/${idEntite}`);

  }
}
