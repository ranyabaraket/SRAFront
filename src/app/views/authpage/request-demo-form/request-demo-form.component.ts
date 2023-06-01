import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthpageService } from '../authpage.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../pages/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-request-demo-form',
  templateUrl: './request-demo-form.component.html',
  styleUrls: ['./request-demo-form.component.scss']
})
export class RequestDemoFormComponent implements OnInit {
  requestdemoForm: FormGroup;
  errorMessage;
  submittedRequest;
  loading: boolean;
  listPays: any = [];
  requestMessage = [];
  captchaResponse;
  recaptcha = environment.recaptcha;
  constructor(
    public authPageService: AuthpageService,
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
    this.listPays = this.authPageService.getPays();
    this.requestdemoForm = new FormGroup({
      idPays: new FormControl('', [Validators.required]),
      nameReq: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      emailReq: new FormControl('', [Validators.required]),
      Code: new FormControl(''),
      mobileReq: new FormControl('', [Validators.required]),
      subjectReq: new FormControl('', [Validators.required]),
      commentReq: new FormControl('', [Validators.required]),
    });
  }
  requestDemo() {
    this.submittedRequest = true;
    if (this.requestdemoForm.invalid) { return; }
    if (!this.captchaResponse) {
      this.toastr.error('Please solve captcha correctly');
      return;
    }
    this.loading = true;
    this.requestdemoForm.value.id = { idEntite: 18 };
    // this.requestdemoForm.value.id = {"idDemo" : 18};
    this.requestdemoForm.value.accountCode = 'WS0430';
    this.authPageService.postRequest(this.requestdemoForm.value).subscribe(
      data => {
        this.requestMessage = data;
        this.toastr.info(data);
        this.loading = false;
      },
      error => {
        this.errorMessage = error;
        this.toastr.error(error);
        this.loading = false;
      }
    );
  }
  getCodePays(event) {
    this.listPays.subscribe(
      data => this.requestdemoForm.controls.Code.setValue(data.find(p => p.idPays === Number(event.target.value)).indTelPays)
    );

   }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
