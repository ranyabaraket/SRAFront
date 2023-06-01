import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import * as oboe from 'oboe';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferResultService {

  constructor(private httpClient: HttpClient,
              public cookie: CookieService, ) {
  }
  streamSearch(searchModel): oboe.Oboe {
    return oboe({
      url: `${environment.backend_url}/transfer/transferSearch/search`,
      method: 'POST',
      body: searchModel,
      headers: { Authorization: `Bearer ${this.cookie.get('UserInformation')}` },

    });
  }
}
