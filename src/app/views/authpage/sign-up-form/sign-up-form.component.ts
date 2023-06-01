import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthpageService } from '../authpage.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from 'angularx-social-login';
import { LanguageService } from '../../pages/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { FacebookLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  signupForm: FormGroup;
  submittedSignup;
  loading: boolean;
  loadingFb: boolean;
  errorMessage;
  cities;
  listPays: any = [];
  listCategories: any = [];
  idPays;
  captchaResponse;
  recaptcha = environment.recaptcha;
   
  constructor(
    public authPageService: AuthpageService,
    public toastr: ToastrService,
    public languageServise: LanguageService,
    public translate: TranslateService,
    private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      this.listPays = this.authPageService.getPays();
      this.getCategory();
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });

    
    this.signupForm = new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      business: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+[a-zA-Z ]+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+[a-zA-Z ]+')]),
      code: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required])
    });

    this.authService.authState.subscribe((user) => {
      if (user !== null && this.loadingFb) {
        this.authPageService.signUp({
          facebookId: user.response.id,
          email: user.response.email,
          firstName: user.response.first_name,
          lasttName: user.response.last_name,
          accountCode: 'WS0430'
        }).subscribe(
          data => {
            this.toastr.info(data);
            this.loadingFb = false;
          },
          error => {
            this.toastr.error(error);
            this.loadingFb = false;
          }
        );
      }
    });
  }
  
  signup() {
    this.submittedSignup = true;
    if (this.signupForm.invalid) { return; }
    if (!this.captchaResponse) {
      this.toastr.error('Please solve captcha correctly');
      return;
    }
    this.loading = true;
    this.signupForm.value.accountCode = 'WS0430';
    this.authPageService.signUp(this.signupForm.value).subscribe(
      data => {
        this.loading = false;
        if (!data.success && data.error) {
          this.toastr.warning(data.error, ' ', {timeOut: 3000});
          return;
        }
        else  if (!data.success && !data.error) {
          this.toastr.error('Error', ' ', {timeOut: 3000});
          return;
        }
        else if (data.success){
          this.toastr.success(this.translate.instant('account created successfully')
          , this.translate.instant('Please check your email.'),
          {timeOut: 3000});
        }

      },
      error => {
        this.errorMessage = error;
        this.toastr.error(error);
        this.loading = false;
      }
    );
  }
  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.captchaResponse = captchaResponse;
    }
  }

  getCity(event) {
    this.listPays.subscribe(
      data => this.signupForm.controls.code.setValue(data.find(p => p.idPays === Number(event.target.value)).indTelPays)
    );

    this.cities = this.authPageService.getCity(event.target.value);
  }
  getCategory() {
    this.listCategories = this.authPageService.getCategory();
  }
  signUpWithFB() {
    this.loadingFb = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
