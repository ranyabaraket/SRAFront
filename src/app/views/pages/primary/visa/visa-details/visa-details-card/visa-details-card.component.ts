import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { VisaService } from '../../visa.service';

@Component({
  selector: 'app-visa-details-card',
  templateUrl: './visa-details-card.component.html',
  styleUrls: ['./visa-details-card.component.scss']
})
export class VisaDetailsCardComponent implements OnInit {

  @Input() paxModel;
  @Input() submitted;
  @Input() price;
  @Input() indexx;
  @Output() backward = new EventEmitter();

  months: any;
  pays: any;
  years = [];
  BirthDatedays = [];
  currentYear = new Date().getFullYear();
  @ViewChild('inputGuestForm')
  inputGuestForm: FormGroupDirective;
  picture: boolean;
  tiersLogo: any;
  selectedFile: File;
  uploaded: boolean;
  termine: boolean;
  info: any;
  uploadForm: FormGroup;
  // UpdateModel: RefWebVisa = new RefWebVisa();
  downloadUrl: any;
  formBuilder: any;
  selectedDoc: File = null;
  docx: any = [];
  dataBack: any = [];
  dataBack2: any = [];

  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private visaService: VisaService,
  ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    for (let i = 0; i < 20; i++) {
      this.years.push(i + this.currentYear);
    }
    for (let i = 0; i < 31; i++) {
      let date;
      if (i < 9) {
        date = '0' + (i + 1);
      } else {
        date = String(i + 1);
      }
      this.BirthDatedays.push(date);
    }
    this.months = this.visaService.getMonths();
  }

  fillDaysBirthDate() {
    let year;
    if (this.paxModel.yyBirthDate) {
      year = this.paxModel.yyBirthDate;
    } else {
      year = this.currentYear;
    }
    if (this.paxModel.mmBirthDate) {
      this.BirthDatedays = [];
      for (let i = 0; i < 31; i++) {
        if (new Date(Number(year), Number(this.paxModel.mmBirthDate) - 1, i + 1).getMonth()
          - (Number(this.paxModel.mmBirthDate) - 1) === 0) {
          this.BirthDatedays.push(('0' + new Date(Number(year), Number(this.paxModel.mmBirthDate) - 1, i + 1).getDate()).slice(-2));
        }
      }
    }
    this.paxModel.birthDate = this.paxModel.ddBirthDate + '-' + this.paxModel.mmBirthDate + '-' + this.paxModel.yyBirthDate;
  }

  applyIntervalYears(value) {
    if (Number(value) < 1926) {
      this.paxModel.yyBirthDate = '1926';
    } else if (Number(value) > this.currentYear) {
      this.paxModel.yyBirthDate = this.currentYear;
    }
    this.fillDaysBirthDate();
  }

  onFileSelect(event, index, indexx) {
    // this.dataBack.urlDoc = event.target.files[0];
    // this.dataBack.index1 = index;
    // this.dataBack.index2 = indexx;
    if (event.target.files.length > 0) {
     this.paxModel.documents[index].urlFile = event.target.files[0];
    }

  //  this.backward.emit(this.dataBack);
  }

}
