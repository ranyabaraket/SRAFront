import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-transfer-history-voucher',
  templateUrl: './transfer-history-voucher.component.html',
  styleUrls: ['./transfer-history-voucher.component.scss']
})
export class TransferHistoryVoucherComponent implements OnInit {
@Input() transferDetails;
@Output() backward = new EventEmitter();
tiersLogo;
tiersName: string;
credits: string;
creditsLimit: string;
callCenter: string;
trUserName: string;
codeDevise: string;
adress: string;
TypeLocations = {
  A: 'Airport',
  H: 'Hotel',
  P: 'Port',
};
  constructor(private cookie: CookieService,
              public translate: TranslateService) { }

  ngOnInit(): void {
  this.tiersName = this.cookie.get('tiersName');
  this.credits = this.cookie.get('credits');
  this.creditsLimit = this.cookie.get('creditsLimit');
  this.callCenter = this.cookie.get('callCenter');
  this.trUserName = this.cookie.get('trUserName');
  this.codeDevise = this.cookie.get('codeDevise');
  this.adress = this.cookie.get('address');
  }
  cancel(): void {
    this.backward.emit(false);
  }
}
