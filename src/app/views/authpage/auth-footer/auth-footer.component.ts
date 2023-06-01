import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../pages/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { AuthpageService } from '../authpage.service';

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AuthFooterComponent implements OnInit {
  language;
  callCenter: string;
  newsData: any;
  newsData1: any = [];
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    public authPageService: AuthpageService,
    public toastr: ToastrService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.languageServise.shareLang.subscribe(data => {
      this.language = data;
    });
  }

  ngOnInit(): void {
    this.getNews();
  }
  changeLanguage(lang) {
    this.language = lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : 'English';
    this.languageServise.changeLanguage(lang);
    this.translate.use(lang);
  }

  getNews() {
    this.authPageService.getNews().subscribe(
      data => {
        this.newsData = data;
        for (let i = 1; i < this.newsData.length; i++) {
          this.newsData1[i - 1] = this.newsData[i];

        }
      }
    );
  }
  trustHtml(exemple){
    return this.sanitizer.bypassSecurityTrustHtml(exemple);
  }
}
