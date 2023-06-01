import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';

@Component({
  selector: 'app-review-transfer',
  templateUrl: './review-transfer.component.html',
  styleUrls: ['./review-transfer.component.scss']
})
export class ReviewTransferComponent implements OnInit {
  @Input() transferDetails: any;
  @Input() searchResult: any;
  @Input() bookingModel;
  decriptionTruncated = '';
  traject;
  constructor( public translate: TranslateService,
               private languageServise: LanguageService, ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    if (this.transferDetails) {
      this.decriptionTruncated = this.transferDetails.general.description.slice(0, 400) + '...';
    }
    if (this.transferDetails.origin_type === 'AP' && this.transferDetails.end_type === 'RT') {
      this.traject = 'Airport to Hotel';
    } else {
      this.traject = 'Hotel to Airport';
    }
  }
  showMore() {
    this.decriptionTruncated = this.transferDetails.general.description;
  }

  showLess() {
    this.decriptionTruncated = this.transferDetails.general.description.slice(0, 400) + '...';
  }
}
