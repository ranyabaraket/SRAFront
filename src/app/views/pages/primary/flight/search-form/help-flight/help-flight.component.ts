import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FlightService } from '../../flight.service';
@Component({
  selector: 'app-help-flight',
  templateUrl: './help-flight.component.html',
  styleUrls: ['./help-flight.component.scss']
})
export class HelpFlightComponent implements OnInit {
  pays = [];
  // Material for autocomplete input
  stateCtrl = new FormControl();
  filteredStates: Observable<any[]>;
  detailsPays;
  loadDetails: boolean;
  constructor(public dialogRef: MatDialogRef<HelpFlightComponent>,
              private flightService: FlightService ) { }

  ngOnInit(): void {
    this.getPays();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.pays.slice())
      );
  }
  // Material for autocomplete input
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.pays.filter(p => p.lpays.toLowerCase().indexOf(filterValue) === 0);
  }
  getPays() {
    this.flightService.getPays().subscribe(
      data => {
        this.pays = data;
      },
      err => console.log(err)
    );
  }
  getPayInfo(str) {
    this.stateCtrl.setValue(this.pays.find(p => p.codePays === str).lpays);
    this.loadDetails = true;
    this.flightService.getAirportListByPays(str).subscribe(
      data => {
        this.loadDetails = false;
        this.detailsPays = data;
      },
      err => console.log(err)
    );
  }
}
