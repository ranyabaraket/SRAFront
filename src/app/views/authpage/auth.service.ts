import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  async authenticate(Credentiels) {
    return await this.http.post(`${environment.backend_url}/b2b/login`, Credentiels).toPromise();
  }
}
