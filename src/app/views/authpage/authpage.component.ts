import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthpageService } from './authpage.service';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StoreMenuService } from '../pages/shared/services/store-menu.service';
import { DomSanitizer } from '@angular/platform-browser';
import AOS from "aos";
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LoginStateService } from './login-form/login-state.service';
import { LanguageService } from '../pages/shared/services/language.service';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthpageComponent implements OnInit {
  showLogin = true;
  showPassword;
  showLoginForm = true;
  showRegister;
  newsData: any;
  newsData1: any = [];
  loginForm: FormGroup;
  submittedLogin;
  loading: boolean;
  loadingFB: boolean;
  wrongAccountCode;
  language;

  constructor(
    public authPageService: AuthpageService,
    public toastr: ToastrService,
    public translate: TranslateService,
    private languageServise: LanguageService,
    private router: Router,
    private cookie: CookieService,
    private sanitizer: DomSanitizer,
    private session: LoginStateService,
  ) {
    this.languageServise.shareLang.subscribe(data => {
      this.language = data;
    });
  }

  ngOnInit(): void {
    //  this.latestSearch = this.hotelService.getLatestSearch();

    if (this.cookie.get('UserInformation')) {
      this.router.navigate(['/pages/home']);
      document.getElementById('langMenu').addEventListener('click', e => {
        e.stopPropagation();
      });
    }
    //this.getNews();


  }
  changeLanguage(lang) {
    this.language = lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : 'English';
    this.languageServise.changeLanguage(lang);
    this.translate.use(lang);
  }

  /*async authenticate() {
    this.authSer.authenticate(this.loginF.value).then((res: any) => {
      let token = res.token;
      localStorage.setItem('token', token);
      delete res.token;
      const ress = JSON.stringify(res)
      localStorage.setItem('connectedUser', ress);
      this.appState.updateState(token, ress); //shared
      this.router.navigateByUrl('/home');

    }).catch(err => console.log(err))
  }*/

  openRegister(ok: boolean) {
    this.showLoginForm = false;
    this.showRegister = true;
  }
  openLoginForm(ok: boolean) {
    this.showRegister = true;
    this.showLoginForm = false;
  }
  openForgetPw(ok: boolean) {
    this.showLogin = false;
    this.showPassword = true;
  }
  openLogin(ok: boolean) {
    this.showLogin = true;
    this.showPassword = false;
  }
  login() {
    // if (!this.captchaResponse) {
    //   this.toastr.error('Please solve captcha correctly');
    //   return ;
    // }
    this.submittedLogin = true;
    // if (this.loginForm.invalid) { return; }
    // if (!this.captchaResponse) {
    //   this.toastr.error('Please solve captcha correctly');
    //   return;
    // }
    // this.loading = true;
    // this.authPageService.login(this.loginForm.value).subscribe(
    //   data => {
    // this.session.setUserLoggedIn(true);
    // this.setCookies(data);
    this.router.navigate(['/pages/flight']);
    //     },
    //   //   error => {
    //   //     this.toastr.error(error);
    //   //     this.loading = false;
    //   //   }
    //   // );
    // }

  }


 /**  getNews() {
    this.authPageService.getNews().subscribe(
      data => {
        this.newsData = data;
        for (let i = 1; i < this.newsData.length; i++) {
          this.newsData1[i - 1] = this.newsData[i];

        }
      }
    );
  }
  trustHtml(exemple) {
    return this.sanitizer.bypassSecurityTrustHtml(exemple);
  }
*/
}

