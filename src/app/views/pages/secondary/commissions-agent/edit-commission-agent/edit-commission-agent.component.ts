import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'typescript';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { commissionAgentDto } from '../commission-agentDto';
import { CommissionsAgentService } from '../commissions-agent.service';

@Component({
  selector: 'app-edit-commission-agent',
  templateUrl: './edit-commission-agent.component.html',
  styleUrls: ['./edit-commission-agent.component.scss']
})
export class EditCommissionAgentComponent implements OnInit {
  Modules = {
    T: 'Flight',
    H: 'Hotel',
    V: 'Visa',
    R: 'Transfer',
    K: 'Package'
  };
  // codeModule: any;
  // txMarkup:any;
  // mntMarkup:any;
  // addToPrice:any;
  // newData: any;
  loading= false;
  commission: commissionAgentDto=new commissionAgentDto();
  object: any;
  
  constructor( 
    private toastr: ToastrService,
    private commissionService: CommissionsAgentService,
    private currencyPipe: CustomCurrencyPipe,

    public translate: TranslateService,
    public dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditCommissionAgentComponent> ) {  
  }

  ngOnInit(): void {
   this.commission =this.data;
  //  this.commission.txAgMarkup=


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
      }
    );
  }

  disableButton() {
    console.log(this.commission.txAgMarkup );
    
    if ( !this.commission.mntAgMarkup  ) {
      return true;
    }

  }

  formater(x) {
    if (x === '0' || x === 0 || x === null) { return '0.000'; }
    return this.currencyPipe.transform(x);
  }
}