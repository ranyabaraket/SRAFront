import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RefNotification } from '../refNotification';


import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-response-support',
  templateUrl: './response-support.component.html',
  styleUrls: ['./response-support.component.scss']
})
export class ResponseSupportComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  responseDateAff;
  inprocessDateAff;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ResponseSupportComponent>,
              private languageServise: LanguageService,
              public translate: TranslateService, ) {
      this.responseDateAff = this.datePipe.transform(this.data.responseDate, 'dd/MM/yyyy hh:mm');
      this.inprocessDateAff = this.datePipe.transform(this.data.inprocessDate, 'dd/MM/yyyy hh:mm');
  }

  ngOnInit() {
  }

}
