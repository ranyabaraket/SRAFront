import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  constructor(
    private router: Router,
    private languageServise: LanguageService,
    public translate: TranslateService) { }
  ngOnInit() {
  }
  currentOnglet(link) {
    return this.router.url.indexOf(link) !== -1;
  }

}
