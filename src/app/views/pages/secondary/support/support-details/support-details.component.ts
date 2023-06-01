import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RefNotification } from '../refNotification';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { SupportService } from '../support.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';


@Component({
  selector: 'app-support-details',
  templateUrl: './support-details.component.html',
  styleUrls: ['./support-details.component.scss']
})
export class SupportDetailsComponent implements OnInit {
  refNotification: RefNotification = new RefNotification();
  status = [{ name: 'PENDING', value: 'E' },
  { name: 'CANCELED', value: 'A' },
  { name: 'RESOLVED', value: 'T' },
  { name: 'REJECTED', value: 'R' },
  { name: 'CLOSED', value: 'C' },
  { name: 'IN PROCESS', value: 'P' }];
  sentTo = [{ name: 'IT SUPPORT', value: 'S' },
  { name: 'FINANCE', value: 'F' },
  { name: 'HELP DESK', value: 'H' },
  { name: 'ADMINISTRATOR', value: 'A' },
  { name: 'CUSTOMER', value: 'C' },
  { name: 'GSA (Administrator)', value: 'G' }];
  img;
  loading;
  token;
  disableForm;
  submitted;
  datePipe = new DatePipe('en-US');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SupportDetailsComponent>,
    private sanitizer: DomSanitizer,
    private cookie: CookieService,
    private toastr: ToastrService,
    private supportService: SupportService,
    private languageServise: LanguageService,
    public translate: TranslateService) {
    if (data) {
      this.refNotification = data;
      if (this.refNotification.notifStatus !== 'P') {
        this.disableForm = true;
        this.refNotification.dtNotifAff = this.datePipe.transform(this.refNotification.dtNotif, 'dd/MM/yyyy hh:mm');
      }
    } else {
      this.refNotification.dtNotifAff = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm');
      this.refNotification.notifStatus = 'E';
      this.refNotification.sentBy = cookie.get('tiersName');
    }
  }

  ngOnInit() {
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + this.refNotification.notifPhoto);
  }

  preview(e: any): void {
    const files = e.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + btoa(binaryString));
    this.refNotification.notifPhoto = btoa(binaryString);
  }
  // insert picture
  preview1(e: any): void {
    const render = new FileReader();
    render.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
      };
      img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }
  save(form) {
    this.submitted = true;
    if (form.invalid) { return; }
    this.loading = true;
    if (this.data) {
      this.edit();
    } else {
      this.add();
    }
  }
  edit() {
    this.supportService.edit(this.refNotification).subscribe(
      data => {
        if (data) {
          this.toastr.success('Success');
          this.loading = false;
          this.dialogRef.close(true);
        } else {
          this.toastr.error('Error');
          this.loading = false;
        }
      },
      err => {
        console.log(err);
        this.toastr.error(err);
        this.loading = false;
      }
    );
  }
  add() {
    this.supportService.add(this.refNotification).subscribe(
      data => {
        if (data) {
          this.toastr.success('Success');
          this.loading = false;
          this.dialogRef.close(true);
        } else {
          this.toastr.error('Error');
          this.loading = false;
        }
      },
      err => {
        console.log(err);
        this.toastr.error(err);
        this.loading = false;
      }
    );
  }
}
