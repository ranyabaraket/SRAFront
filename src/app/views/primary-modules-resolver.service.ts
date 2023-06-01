import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PagesService } from './pages/pages.service';
import { CookieService } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class PrimaryModulesResolverService implements Resolve<any[]> {

  constructor(
    private pagesService: PagesService,
    private cookie: CookieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    return this.pagesService.getPrimaryModules();
  }
}
