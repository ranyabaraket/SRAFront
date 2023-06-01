import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';

export interface TableElement {
  codeModule: any;
  txAgMarkup;
  mntAgMarkup;
  dtCreate;
  dtModif: any;
  refUser:any;
  addToPrice: any;
}
@Component({
  selector: 'app-commission-agent-list',
  templateUrl: './commission-agent-list.component.html',
  styleUrls: ['./commission-agent-list.component.scss']
})
export class CommissionAgentListComponent implements OnInit {

  source=[];

  displayedColumns = ["codeModule", "txAgMarkup", "mntAgMarkup", "refUser","dtCreate","dtModif","addToPrice"];
  ELEMENT_DATA: TableElement[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CommissionAgentListComponent>,
  private currencyPipe: CustomCurrencyPipe,
) { 
    this.data.mntAgMarkup = this.currencyPipe.transform(this.data.mntAgMarkup);
    this.source.push(this.data)

    console.log(this.data);
    
  }

  ngOnInit(): void {
  }
close(){
  this.dialogRef.close()
}
}
