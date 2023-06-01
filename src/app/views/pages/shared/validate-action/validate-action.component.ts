import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validate-action',
  templateUrl: './validate-action.component.html',
  styleUrls: ['./validate-action.component.scss']
})
export class ValidateActionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ValidateActionComponent>) { }

  ngOnInit(): void {
  }

}
