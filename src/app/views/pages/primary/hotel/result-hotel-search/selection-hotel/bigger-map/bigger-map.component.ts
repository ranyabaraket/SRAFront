import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HotelSearchModel } from '../../../hotelSearchModel';

@Component({
  selector: 'app-bigger-map',
  templateUrl: './bigger-map.component.html',
  styleUrls: ['./bigger-map.component.scss']
})
export class BiggerMapComponent implements OnInit {
  eventsMapSubject: Subject<[]> = new Subject<[]>();
  searchModel: any = new HotelSearchModel();
  searchResultList: any;
  closedMap: boolean;
  constructor(
    public dialogRef: MatDialogRef<BiggerMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.closedMap = false;
    this.searchModel = this.data.searchModel;
    this.searchResultList = this.data.searchResultList;
    this.dialogRef.beforeClosed().subscribe(res => {
      this.closedMap = true;
    });
  }

}
