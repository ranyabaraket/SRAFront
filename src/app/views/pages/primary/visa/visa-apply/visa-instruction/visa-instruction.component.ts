import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VisaService } from '../../visa.service';

@Component({
  selector: 'app-visa-instruction',
  templateUrl: './visa-instruction.component.html',
  styleUrls: ['./visa-instruction.component.scss']
})
export class VisaInstructionComponent implements OnInit {
  listInstruction: any;
  listInstruction1: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VisaInstructionComponent>,
    private visaService: VisaService
  ) { }

  ngOnInit(): void {
    this.listInstruction = this.data.documents;
    if (this.data.instruction.length > 0) {
      this.listInstruction1 = this.data.instruction[0].noteInsvisa;
    }
  }

}
