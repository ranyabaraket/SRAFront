import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'typescript';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { commissionDto } from '../commissionDto';
import { CommissionsService } from '../commissions.service';

@Component({
  selector: 'app-edit-commission',
  templateUrl: './edit-commission.component.html',
  styleUrls: ['./edit-commission.component.scss']
})
export class EditCommissionComponent implements OnInit {
  Modules = {
    T: 'Flight',
    H: 'Hotel',
    V: 'Visa',
    R: 'Transfer',
    K: 'Package'
  };
  codeModule: any;
  txMarkup:any;
  mntMarkup:any;
  addToPrice:any;
  newData: any;
  loading= false;
  commission: commissionDto=new commissionDto();
  object: any;
  
  constructor( 
    private toastr: ToastrService,
    private commissionService: CommissionsService,
 
    public translate: TranslateService,
    public dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditCommissionComponent> ) {  
  }

  ngOnInit(): void {
   this.commission =this.data;


  }

  save() {

    this.loading =true;
    this.commissionService.edit(this.commission).subscribe(
      data => {
      if(data){
        this.toastr.success(this.translate.instant('Success'));
        this.loading =false;
        this.dialogRef.close(true)
      }

      },
      error => {
        this.toastr.error(this.translate.instant(error));
        this.loading =false;
        this.dialogRef.close()

      }
    );
  }
  disableButton() {
    if (!this.commission.addToPrice || !this.commission.codeModule || !this.commission.mntMarkup) {
      return true;
    }

  }
}