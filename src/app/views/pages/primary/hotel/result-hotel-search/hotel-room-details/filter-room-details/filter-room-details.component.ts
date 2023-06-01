import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-room-details',
  templateUrl: './filter-room-details.component.html',
  styleUrls: ['./filter-room-details.component.scss']
})
export class FilterRoomDetailsComponent implements OnInit {
  @Input() dataInput;
  @Output() backward = new EventEmitter();
  filter: any = {
    Nnrefundable: true,
    refundable: true
  };
  filter1: any = [];
  filterRf: any = [];
  filtredRslt;
  dataX;
  listmeals: any = [,true]

  constructor() { }
  ngOnInit(): void {
    this.dataX = this.dataInput;
    console.log("dataInput", this.dataInput);
    this.filter1 = this.dataInput.filterRooms.meals;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.filter1.length; i++) {
      this.filter1[i].check = true;
    }
    console.log("filter 1 :: ", this.filter1);
    
  }

  applyFilter() {
    this.filtredRslt = this.dataX.rooms;
    console.log("filter rslt : ", this.filtredRslt);
    
    if (this.filter.refundable === false && this.filter.Nnrefundable === true) {
      this.filtredRslt = this.applyFilterNnRefundable();
    }
    if (this.filter.Nnrefundable === false && this.filter.refundable === true) {
      this.filtredRslt = this.applyFilterRefundable();
    }
    if (this.filter.Nnrefundable === true && this.filter.refundable === true) {
      this.filtredRslt = this.changeValueToCheckAll1();
    }
    if (this.filter.Nnrefundable === false && this.filter.refundable === false) {
      this.filtredRslt = this.changeValueToNone1();
    }
    // this.filtredRslt = this.applyFilterMeals();
    this.backward.emit(this.filtredRslt);
  }
  changeValueToNone1() {
    const result = [];
    return result;
  }
  changeValueToCheckAll1() {
    const result = [];
    this.filtredRslt.forEach(element => {
      result.push(element);
      console.log("elmnt pushed are : ", result)
    });
    return result;
  }

  applyFilterMeals() {
    console.log("filtredRslt ::: ", this.filtredRslt);
    console.log("filter1 !!! ", this.filter1);
    
    
    const result = [];
    this.filtredRslt.forEach(element => {
      if (element.meals !== null) {
        this.filter1.forEach(element1 => {
          if (element.meals.toUpperCase() === element1.name && element1.check === true) {
            result.push(element);
          }
        });
      }
    });
    return result;
  }
  applyFilterRefundable() {
    // const result = [];
    const result = this.filtredRslt.filter(
      element =>
        element.notRefundable === false
    );
    return result;
  }

  applyFilterNnRefundable() {
    const result = this.filtredRslt.filter(element =>
      element.notRefundable === true
    );
    console.log("result non refundable is : ", result);
    
    return result;
  }

  changeValueToNone() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.filter1.length; i++) {
      this.filter1[i].check = false;
    }
    this.applyFilter();
  }
  changeValueToCheckAll() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.filter1.length; i++) {
      this.filter1[i].check = true;
    }
    this.backward.emit(this.dataInput.rooms);
  }

}
