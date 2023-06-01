import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';


@Component({
  selector: 'app-review-flight',
  templateUrl: './review-flight.component.html',
  styleUrls: ['./review-flight.component.scss']
})
export class ReviewFlightComponent implements OnInit, OnDestroy {
  @Input() flightDetails;

  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
  ) {
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
  ngOnDestroy() {
  }

}
