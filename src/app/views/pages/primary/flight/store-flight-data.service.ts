import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreFlightDataService {


  private step = new BehaviorSubject<any>([]);
  private StoredStep = this.step.asObservable();


  constructor() {

  }
  changeStep(step) {
    this.step.next(step);
  }
  getSteps() {
    return this.StoredStep;
  }

}
