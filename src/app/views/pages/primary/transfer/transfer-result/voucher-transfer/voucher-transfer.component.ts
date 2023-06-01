import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { StoreFlightDataService } from '../../../flight/store-flight-data.service';

@Component({
  selector: 'app-voucher-transfer',
  templateUrl: './voucher-transfer.component.html',
  styleUrls: ['./voucher-transfer.component.scss']
})
export class VoucherTransferComponent implements OnInit, AfterViewInit {
  voucherDetailsModel: any;
  tiersName;
  callCenter;
  email;
  paxName;
  typeDrop;
  pickupType;
  typeRent: string;
  polyline = require('@mapbox/polyline');
  polyLineCode: any;

  constructor(
    private storeFlightData: StoreFlightDataService,
    private cookie: CookieService
  ) { }

  ngAfterViewInit(): void {
    this.storeFlightData.changeStep(3);
  }

  ngOnInit(): void {
    this.voucherDetailsModel = JSON.parse(localStorage.getItem('dataToVoucher'));
    this.tiersName = this.cookie.get('tiersName');
    this.callCenter = this.cookie.get('callCenter');
    this.email = this.cookie.get('email');
    // tslint:disable-next-line: max-line-length
    this.paxName = this.voucherDetailsModel.search.leadTitle + ' ' + this.voucherDetailsModel.search.leadnameAff + ' ' + this.voucherDetailsModel.search.leadsurnameAff;
    this.getPolyline();
    switch (this.voucherDetailsModel.search.dropoffType) {
      case 'A':
        this.typeDrop = 'Airport';
        break;
      case 'H':
        this.typeDrop = 'Hotel';
        break;
      case 'S':
        this.typeDrop = 'Port';
        break;
      default:
        this.typeDrop = 'Airport';
        break;
    }
    switch (this.voucherDetailsModel.search.pickupType) {
      case 'A':
        this.pickupType = 'Airport';
        break;
      case 'H':
        this.pickupType = 'Hotel';
        break;
      case 'S':
        this.pickupType = 'Port';
        break;
      default:
        this.pickupType = 'Airport';
        break;
    }
    switch (this.voucherDetailsModel.search.typeRent) {
      case 'T':
        this.typeRent = 'Transfer';
        break;
      case 'L':
        this.typeRent = 'Car rental';
        break;
      default:
        this.typeRent = 'Transfer';
        break;
    }
  }

  getPolyline() {
    this.polyLineCode = this.polyline.fromGeoJSON({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        // tslint:disable-next-line: max-line-length
        coordinates: [[this.voucherDetailsModel.search.pickupLatitude, this.voucherDetailsModel.search.pickupLongitude], [this.voucherDetailsModel.search.dropoffLatitude, this.voucherDetailsModel.search.dropoffLongitude]]
      },
      properties: {}
    });
  }

}
