import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthpageService } from '../authpage.service';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LanguageService } from '../../pages/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginStateService } from './login-state.service';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  submittedLogin;
  loading: boolean;
  loadingFB: boolean;
  wrongAccountCode;
  captchaResponse;
  //recaptcha = environment.recaptcha;
  @Output() backward = new EventEmitter();
  constructor(
    public authPageService: AuthpageService,
    private toastr: ToastrService,
    private router: Router,
    private cookie: CookieService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private session: LoginStateService,
    private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.loginForm = new FormGroup({
      accountCode: new FormControl('WS0430',[Validators.required]),
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
    // this.loginForm.setValue({ accountCode: 'WS0430', password: '', username: '' });
    this.authService.authState.subscribe((user) => {
      if (user !== null && this.loadingFB) {
        this.authPageService.loginFB({ facebookId: user.response.id, email: user.response.email, accountCode : 'WS0430' }).subscribe(
          data => {
            this.session.setUserLoggedIn(true);
            this.setCookies(data);
            this.router.navigate(['/pages/home']);
          },
          error => {
            this.toastr.error(error);
            this.loadingFB = false;
          }
        );
      }
    });
  }

  login() {
    // if (!this.captchaResponse) {
    //   this.toastr.error('Please solve captcha correctly');
    //   return ;
    // }
    console.log('raniiaa')
    this.submittedLogin = true;
    if (this.loginForm.invalid) {  console.log('erreur ici'); return; }
    // if (!this.captchaResponse) {
    //   this.toastr.error('Please solve captcha correctly');
    //   return;
    // }
    this.loading = true;
    this.authPageService.login(this.loginForm.value).subscribe(
      data => {
        console.log('raniiaa'+data)
        this.session.setUserLoggedIn(true);
        this.setCookies(data);
        this.router.navigate(['/pages/home']);
      },
      error => {
        this.toastr.error(error);
        this.loading = false;
      }
    );
  }
  setCookies(data) {
    const expire = new Date();
    const time = Date.now() + ((3600 * 1000) * 6); // current time + 6 hours ///
    expire.setTime(time);
    this.cookie.set('UserInformation', data.token, expire);
    this.cookie.set('callCenter', data.callCenter, expire);
    this.cookie.set('codeDevise', data.codeDevise, expire);
    this.cookie.set('credits', data.credits, expire);
    // this.cookie.set('creditsLimit', data.creditsLimit);
    this.cookie.set('tiersName', data.tiersName, expire);
    this.cookie.set('trUserName', data.trUserName, expire);
    this.cookie.set('email', data.email, expire);
    this.cookie.set('canSelect', data.canSelect, expire);
    this.cookie.set('canBook', data.canBook, expire);
    this.cookie.set('address', data.address, expire);
    this.cookie.set('idEntiteUser',data.idEntiteUser,expire);
    this.cookie.set('idEntite',data.idEntite,expire);
    this.cookie.set('idTiers',data.idTiers,expire);
  }

  openForgetPw(): void {
    this.backward.emit(true);
  }
  signInWithFB(): void {
    this.loadingFB = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.captchaResponse = captchaResponse;
    }
  }
}

