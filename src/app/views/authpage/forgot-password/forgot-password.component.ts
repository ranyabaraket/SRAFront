import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthpageService } from '../authpage.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../pages/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword: FormGroup;
  submittedPassword;
  loading: boolean;
  wrongAccountCode;
  errorMessage;
  Message;
  @Output() backward = new EventEmitter();
  constructor(public authPageService: AuthpageService,
              public toastr: ToastrService,
              public languageServise: LanguageService,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.forgotPassword = new FormGroup({
      accountCode: new FormControl(),
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }
  forgotPsw() {
    this.submittedPassword = true;
    // this.wrongAccountCode = this.forgotPassword.get('accountCode').value !== 'WS0430';
    // if (this.wrongAccountCode) { this.toastr.error('Not SKY GULF\'s Account Code'); }
    // if (this.forgotPassword.invalid || this.wrongAccountCode) { return; }
    this.wrongAccountCode = 'WS0430';
    if (this.forgotPassword.invalid) { return; }
    this.loading = true;
    this.authPageService.forgotPsw(this.forgotPassword.value).subscribe(
      data => {
        this.Message = data;
        this.toastr.info(data);
      },
      error => {
        this.errorMessage = error;
        this.toastr.error(error);
        this.loading = false;
      }
    );
  }
  openLogin(): void {
    this.backward.emit(true);
  }
}
