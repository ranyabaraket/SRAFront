import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-car-hire',
  templateUrl: './car-hire.component.html',
  styleUrls: ['./car-hire.component.scss']
})
export class CarHireComponent implements OnInit {
  loadingSearch;
  constructor( private languageServise: LanguageService,
               public translate: TranslateService,
               private router: Router ) {
                }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }
  search(searchModel) {
    console.log(searchModel);
    this.loadingSearch = true;
    this.router.navigate(['/pages/car-hire/result/selection'], {
      state: {
        searchModel
      }
    });
  }
}
