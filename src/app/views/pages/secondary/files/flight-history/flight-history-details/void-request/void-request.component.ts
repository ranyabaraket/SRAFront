import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RefRequest } from '../refRequest';
import { FlightHistoryDetailsService } from '../flight-history-details.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-void-request',
  templateUrl: './void-request.component.html',
  styleUrls: ['./void-request.component.scss']
})
export class VoidRequestComponent implements OnInit {
  allSegments;
  allPassengers;
  @Input() data: any;
  @Output() backward = new EventEmitter();
  requestModel: RefRequest = new RefRequest();
  token;
  loading: boolean;
  constructor(
    private flightDetailsService: FlightHistoryDetailsService,
    private toastr: ToastrService,  public languageServise: LanguageService,
    public translate: TranslateService ) {
  }

  ngOnInit() {
    this.data.segments.map(obj => ({ ...obj, selected: false }));
    this.data.passengers.map(obj => ({ ...obj, selected: false }));
    this.requestModel.oprName = this.data.user;
    this.requestModel.uniqueId = this.data.uniqueId;
    this.requestModel.numPnr = this.data.numPnr;
  }
  selectAllSegments(event) {
    this.data.segments.forEach(element => {
      element.selected = this.allSegments;
    });
  }
  selectAllPassengers(event) {
    this.data.passengers.forEach(element => {
      element.selected = this.allPassengers;
    });
  }
  void() {
    this.loading = true;
    this.requestModel.detailsList = this.data.passengers.filter(p => p.selected === true);
    this.requestModel.segmentsList = this.data.segments.filter(p => p.selected === true);
    this.flightDetailsService.sendRequest('void', this.requestModel).subscribe(
      data => {
        this.loading = false;
        this.toastr.success('success');
        this.backward.emit(true);
      },
      err => {
        this.toastr.error(err);
        this.loading = false;
      }
    );
  }
  cancel(): void {
    this.backward.emit(false);
  }
  getSrcImg(codeCom) {
    return 'http://sra-sa.com:88/airelines/' + codeCom + '.png';
  }
}
