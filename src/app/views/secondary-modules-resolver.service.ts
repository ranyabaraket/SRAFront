import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PagesService } from './pages/pages.service';
import { CookieService } from 'ng2-cookies';
/**@Injectable({
  providedIn: 'root'
})
export class SecondaryModulesResolverService implements Resolve<any[]> {
idEntite;
  constructor(
    private pagesService: PagesService,
    private cookie: CookieService) {
      this.idEntite=this.cookie.get('idEntite')
    }

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    // return this.pagesService.getSecondaryModulesByIdEntite(this.idEntite);
  //  return this.pagesService.getSecondaryModules()

  }
}
*/
