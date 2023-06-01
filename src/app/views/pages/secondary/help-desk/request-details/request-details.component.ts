import { Component, OnInit } from '@angular/core';
import { RequestDetailsService } from './request-details.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {

  token;
  sub;
  requestDetails: any;
  constructor(
    private requestDetailsService: RequestDetailsService,
    private toastr: ToastrService,
    private cookie: CookieService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getRequests(params.uniqueId);
    });
  }
  getRequests(uniqueId) {
    this.requestDetailsService.getRequestDetail(uniqueId).subscribe(
      data => {
        this.requestDetails = data;
      },
      error => {
        this.toastr.error(error);
      }
    );
  }
  updateStatus(status, idRequest, note) {
    this.requestDetailsService.updateRequestStatus(status, idRequest, note).subscribe(
      data => {
        this.requestDetails = data;
      },
      error => {
        this.toastr.error(error);
      }
    );
  }
  getSrcImg(codeCom) {
    return 'http://sra-sa.com:88/airelines/' + codeCom + '.png';
  }
  back() {
    this.location.back();
  }
}
