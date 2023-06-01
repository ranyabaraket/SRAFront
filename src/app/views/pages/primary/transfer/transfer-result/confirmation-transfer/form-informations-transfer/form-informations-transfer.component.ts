import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { ConfirmationTransferService } from '../confirmation-transfer.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
@Component({
  selector: 'app-form-informations-transfer',
  templateUrl: './form-informations-transfer.component.html',
  styleUrls: ['./form-informations-transfer.component.scss']
})
export class FormInformationsTransferComponent implements OnInit, OnDestroy {
  @Input() submitted;
  @Input() bookingModel;
  @Input() searchResult;
  @Input() success;
  @Input() searchModel;
  sub;
  airlines;
  filteredOptionsFrom: Observable<string[]>;
  filteredOptionsTo: Observable<string[]>;
  constructor(private confirmationTransferService: ConfirmationTransferService,
              public translate: TranslateService,
              private languageServise: LanguageService,
              private cookie: CookieService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.confirmationTransferService.getAirlines().subscribe(
      data => {
        this.airlines = data;
      },
      err => console.log(err)
    );
  }
  removeSpaces(str) {
    return str.split(' ').join('');
  }
  getAirportsFrom(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsFrom = this.confirmationTransferService.getAirport(event.target.value);
    }
  }
  getAirportsTo(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsTo = this.confirmationTransferService.getAirport(event.target.value);
    }
  }
  filteredOptionsFromClear(event) {
    this.filteredOptionsFrom = new Observable<string[]>();
  }
  filteredOptionsToClear(event) {
    this.filteredOptionsTo = new Observable<string[]>();
  }
}
