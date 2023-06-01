import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  constructor(
    private router: Router,
    public languageServise: LanguageService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }

  currentOnglet(link) {
    return this.router.url.indexOf(link) !== -1;
  }
}
