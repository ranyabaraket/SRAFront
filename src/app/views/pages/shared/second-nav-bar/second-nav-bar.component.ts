import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { PagesService } from '../../pages.service';
import { StoreNewsService } from '../../secondary/news/store-news.service';
import { LanguageService } from '../services/language.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-second-nav-bar',
  templateUrl: './second-nav-bar.component.html',
  styleUrls: ['./second-nav-bar.component.scss']
})
export class SecondNavBarComponent implements OnInit {
  openSidenav = false;
  subMenu;
  nbNews = 0;
  mybutton;
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private cookie: CookieService,
    private pagesService: PagesService,
    private router: Router,
    private storeNews: StoreNewsService,
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
