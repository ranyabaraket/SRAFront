import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ng2-cookies';
import { FlightService } from './flight.service';
import { SearchModel } from './searchModel';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  searchModel: SearchModel = new SearchModel();
  latestSearch;
  loadingSearch: boolean;
  constructor(
    private cookie: CookieService,
    private flightService: FlightService,
    private router: Router,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.latestSearch = this.flightService.getLatestSearch();
  }

  search(searchModel) {
    this.loadingSearch = true;
    this.router.navigate(['/pages/flight/result/selection'], {
      state: {
        searchModel
      }
    });
  }



}
