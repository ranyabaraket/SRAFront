import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import * as oboe from 'oboe';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarHireResultServiceService {

  constructor(private httpClient: HttpClient,
              public cookie: CookieService) { }
  search(model): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/car-hire/search/` , model);
  }

  streamSearch(searchModel): oboe.Oboe {
    return oboe({
      url: `${environment.backend_url}/car-hire/search/`,
      method: 'POST',
      body: searchModel,
      headers: { Authorization: `Bearer ${this.cookie.get('UserInformation')}` },
    });
  }
}
