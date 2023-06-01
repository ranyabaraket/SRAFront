import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ng2-cookies';
import { LoginStateService } from '../../authpage/login-form/login-state.service';
@Injectable({
    providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
    token;
    constructor(private cookie: CookieService, private router: Router, private session: LoginStateService) {
        this.session.getUserLoggedIn().subscribe(userLoggedIn => {

        });
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.cookie.get('UserInformation') !== '') {
            return true;
        } else {
            this.router.navigateByUrl('auth');
            return false;
        }
    }

}
