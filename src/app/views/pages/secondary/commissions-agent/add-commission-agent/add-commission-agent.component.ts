import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { LanguageService } from '../../../shared/services/language.service';
import { commissionAgentDto } from '../commission-agentDto';
import { CommissionsAgentService } from '../commissions-agent.service';

@Component({
  selector: 'app-add-commission-agent',
  templateUrl: './add-commission-agent.component.html',
  styleUrls: ['./add-commission-agent.component.scss']
})
export class AddCommissionAgentComponent implements OnInit {

  Modules = {
    T: 'Flight',
    H: 'Hotel',
    V: 'Visa',
    R: 'Transfer',
    K: 'Package'
  };
  codeModule: any;
  txAgMarkup:any;
  mntAgMarkup:any;
  newData: any;
  loading= false;
  commission: commissionAgentDto=new commissionAgentDto();
  constructor( 
    private toastr: ToastrService,
    private commissionService: CommissionsAgentService,
    public translate: TranslateService,
    public dialog: MatDialog,
    public cookies:CookieService,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AddCommissionAgentComponent> ) {
    this.commission.id.idUserTiers=this.cookies.get('idUserTiers')

  }

  ngOnInit(): void {
  }

  save() {
  this.loading =true;
  console.log(this.commission);
  
    this.commissionService.add(this.commission).subscribe(
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
    if (!this.commission.id.codeModule || !this.commission.mntAgMarkup || !this.commission.txAgMarkup) {
      return true;
    }

  }

  onChange(event) {
    this.loading=true;
    this.commissionService.getCommissionByCodeModule(    this.cookies.get('idUserTiers'),event.target.value).subscribe(data => {
      if (data) {
        this.loading=false;
        this.toastr.warning(this.translate.instant("Please select another module, Already exists"));
        this.commission.id.codeModule = "";

      } else {
        this.loading=false;
      }
    })
  }
}
