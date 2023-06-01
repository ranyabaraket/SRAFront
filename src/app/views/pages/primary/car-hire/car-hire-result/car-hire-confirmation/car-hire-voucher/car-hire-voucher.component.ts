import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { CookieService } from 'ng2-cookies';
@Component({
  selector: 'app-car-hire-voucher',
  templateUrl: './car-hire-voucher.component.html',
  styleUrls: ['./car-hire-voucher.component.scss']
})
export class CarHireVoucherComponent implements OnInit {
  @Input() contractModel;
  @Input() bookingModel ;
  @Input() bookingId ;
  @Output() backward = new EventEmitter();
  tiersLogo;
tiersName: string;
credits: string;
creditsLimit: string;
callCenter: string;
trUserName: string;
codeDevise: string;
adress: string;
  constructor(private cookie: CookieService) { }

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
