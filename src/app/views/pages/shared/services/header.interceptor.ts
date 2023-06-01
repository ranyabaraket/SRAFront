import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = '';
    if (this.cookie.check('UserInformation')) {
      token = this.cookie.get('UserInformation');
    }
    if (!req.url.includes('http://51.83.70.51:90/') && !req.url.includes('https://api.openweathermap.org/data/2.5')) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Methods', '*')
          .set('Access-Control-Allow-Credentials', 'true')
          .set('Access-Control-Allow-Headers', '*')
          .set('Strict-Transport-Security', 'max-age=31536000')
          .set('Cache-Control', 'max-age=3000, must-revalidate')
          .set('Content-Type', 'application/json')
          //   .set('Pragma', 'no-cache')
          .set('Authorization', 'Bearer ' + token),
      });
      return next.handle(modifiedReq);
    }
    if (req.url.includes('https://api.openweathermap.org/data/2.5')) {
      const modifiedReq = req.clone({
        headers: req.headers
        // .set('Access-Control-Allow-Origin', '*')
        //   .set('Access-Control-Allow-Methods', '*')
        //   .set('Access-Control-Allow-Credentials', 'true')
        //   .set('Access-Control-Allow-Headers', '*')
          // .set('Strict-Transport-Security', 'max-age=31536000')
          // .set('Cache-Control', 'max-age=3000, must-revalidate')
          //   .set('Pragma', 'no-cache')
          // .set('Authorization', 'Bearer ' + token),
      });
      return next.handle(modifiedReq);
    }
    else {
      const modifiedReq = req.clone({
        headers: req.headers
          .set('Authorization', `Basic ` + btoa('worldsoft:admindata')),
      });
      return next.handle(modifiedReq);
    }
  }
}
