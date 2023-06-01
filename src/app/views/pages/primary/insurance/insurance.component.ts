import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsuranceService } from './insurance.service';
import { SharedInsuranceService } from './sharedInsurance.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  latestSearch: any;
  loading;
  constructor(
    private router: Router,
    private insurnceService: InsuranceService,
    private sharedInsuranceService: SharedInsuranceService
  ) { }

  ngOnInit(): void {
    this.latestSearch = this.insurnceService.getLastSearch();
  }
  search(searchModel) {
    this.loading = true;
  //  this.hotelService.changeStep([0, 1]);
    this.sharedInsuranceService.nextMessage(searchModel);
    this.router.navigate(['/pages/insurance/result'], {
      state: {
        searchModel
      }
    });
  }

}
