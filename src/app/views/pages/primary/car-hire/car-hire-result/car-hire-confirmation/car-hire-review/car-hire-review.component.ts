import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';

@Component({
  selector: 'app-car-hire-review',
  templateUrl: './car-hire-review.component.html',
  styleUrls: ['./car-hire-review.component.scss']
})
export class CarHireReviewComponent implements OnInit {
  @Input() carDetails;
  @Input() contractModel;
  @Input() bookingId;
  @Input() showVoucher;
  @Input() canceled;
  @Input()  cancelId;
  constructor(  public translate: TranslateService,
                private languageService: LanguageService, ) { }

  ngOnInit(): void {
  }

}
