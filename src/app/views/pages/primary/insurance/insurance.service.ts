import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private step = new BehaviorSubject<any>([]);
  private StoredStep = this.step.asObservable();

  constructor(private httpClient: HttpClient) { }
  getAirport(str): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/airports/bystring/` + str);
  }
  changeStep(step) {
    this.step.next(step);
  }
  getSteps() {
    return this.StoredStep;
  }

  searchInsurance(insuranceSearchModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/insurances/search/`, insuranceSearchModel);
  }

  confirmPurchase(confirmPurchaseModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/insurances/comfirm/`, confirmPurchaseModel);
  }

  getLastSearch(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/insurances/lastsearch/`);
  }

  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  getMonths() {
    return this.httpClient.get('../../../../../../../assets/data/months.json');
  }
}
