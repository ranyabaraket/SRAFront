import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as oboe from 'oboe';
import { CookieService } from 'ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class CarHireService {

  constructor(private httpClient: HttpClient,
              public cookie: CookieService) { }
  streamPickupList(str): oboe.Oboe {
    const model = {format : 'json', string: str };
    return oboe({
      url: `${environment.backend_url}/car-hire/destinations/`,
      method: 'POST',
      body: model,
      headers: { Authorization: `Bearer ${this.cookie.get('UserInformation')}` },
    });
  }
}
