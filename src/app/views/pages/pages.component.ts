import { Component, OnInit } from '@angular/core';
import { LanguageService } from './shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from './pages.service';
import { StoreNewsService } from './secondary/news/store-news.service';
import { StoreMenuService } from './shared/services/store-menu.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  mysidwidth: string;
  marginLeft: string;
  navML = '3em';
  openSidenav = false;
  selectedModule;
  term;
  location;
  subMenu;
  menu = [];
  token;
  nbNews = 0;
  mybutton;
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private cookie: CookieService,
    private pagesService: PagesService,
    private router: Router,
    private storeNews: StoreNewsService,
    //  private storeMenu: StoreMenuService,
    route: ActivatedRoute) {
    if (!this.cookie.get('UserInformation')) {
      this.router.navigate(['/auth']);
    }
    route.data.subscribe(data => {
      this.subMenu = data.secondaryModules;
    });
    /*route.data.subscribe(data => {
      this.menu = data.primaryModules;
      this.storeMenu.storePrimaryMenu(this.menu);
    });*/
  }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    // Get the button
    this.mybutton = document.getElementById('myBtn');

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = () => { this.scrollFunction(); };
    this.getNews();
    // this.storeNews.getnbUnreadNews().subscribe(data => {
    //   if (data) {
    //     this.nbNews = data;
    //   } else {
    //     this.nbNews = 0;
    //   }
    // });
  }


  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.mybutton.style.display = 'block';
    } else {
      this.mybutton.style.display = 'none';
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  openCloseNav() {
    this.openSidenav = !this.openSidenav;
    if (this.openSidenav) {
      this.navML = '13em';
    } else {
      this.navML = '3em';
    }

  }

  currentModule() {
    if (s => s.webLink.toUpperCase().split('/')[2] !== 'HOME') {
      const m = this.subMenu.find(s => s.webLink.toUpperCase().split('/')[2]
        === this.router.url.split('/')[2].toUpperCase());
      if (m) { return m; } else { return ''; }
    }
  }
  getNews() {
    this.pagesService.getNews().subscribe(
      data => {
        if (data) {
          this.storeNews.storeNews(data);
          //   this.storeNews.storenbUnreadNews(data)
        }
        if (_.isArray(data)) {
          this.nbNews = data.length;
          this.storeNews.storenbUnreadNews(this.nbNews);
        }
      }
    );
  }
}
