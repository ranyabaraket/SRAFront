import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { SendEmailModel } from './sendEmailModel';
import { SendEmailService } from './send-email.service';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  sendEmailModel: SendEmailModel = new SendEmailModel();
  sendEmailMessage = [];
  submitted;
  loadSend;
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private sendEmailService: SendEmailService,
    private cookie: CookieService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SendEmailComponent>) { }

  ngOnInit(): void {
    // this.Send();
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }
  Send(sendForm) {
    this.submitted = true;
    if (sendForm.invalid) { return; }
    this.loadSend = true;
    this.sendEmailService.postSend(this.sendEmailModel).subscribe(
      data => {
        if (data) {
          this.sendEmailMessage = data;
          this.toastr.success(this.translate.instant('Email sent successfully'));
          this.loadSend = false;
          this.dialogRef.close();
        }
      },
      error => {
        this.toastr.error(error);
        this.toastr.error(this.translate.instant(error));
        this.loadSend = false;
      }
    );

  }
}
