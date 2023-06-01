import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ng2-cookies';
import { log } from 'console';
@Injectable({
  providedIn: 'root'
})
export class SubAgentService {
  idEntite: any;
  idTiers: any;

  constructor(private httpClient: HttpClient, private cookie: CookieService) {
    this.idEntite = this.cookie.get("idEntite");
    this.idTiers = this.cookie.get("idTiers");
  }
  getUsers(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/refutilisateur/`);

  }
  getFonctions(idEntite): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/fonctionpers/`+idEntite);
  }
  getDevise(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/devise/`);
  }
  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  userLimit(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/refutilisateur/limitUser`);
  }
  findRefUserTiersByLginPwd(refUtilistateur): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/refutilisateur/byLoginPwd`, refUtilistateur,
      {
        responseType: 'text' as 'json'
      });
  }

  search(searchModel, idEntite, idTiers): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/refutilisateur/search/`+idEntite+ '/'+idTiers, searchModel)
      .pipe(
        catchError(this.handleError)
      );
  }

  save(refUtilistateur, idEntite, idTiers, idUserTiers, idUserCash): Observable<any> {
    console.log("idUserCash ! ", idUserCash);
    console.log("id UserTiers !", idUserTiers)
    
    return this.httpClient.post(`${environment.backend_url}/refutilisateur/add/`+idEntite+ '/'+idTiers+ '/'+idUserTiers, refUtilistateur)
      .pipe(
        catchError(this.handleError)
      );
  }
  edit(refUtilistateur, idUserTiers: number): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/refutilisateur/update/`+idUserTiers, refUtilistateur)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateActifTruser(refUtilistateur, actifTruser): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/refutilisateur/updateTiersActif/`+actifTruser, refUtilistateur)
      .pipe(
        catchError(this.handleError)
      );
  }
  getCommissionByCodeModule(idUserTiers,codeModule): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/commission/AppAgentCommission/commissionAgent/${idUserTiers}/${codeModule}`)
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
