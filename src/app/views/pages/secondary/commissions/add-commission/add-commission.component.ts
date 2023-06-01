import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { LanguageService } from '../../../shared/services/language.service';
import { commissionDto } from '../commissionDto';
import { CommissionsService } from '../commissions.service';

@Component({
  selector: 'app-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.scss']
})
export class AddCommissionComponent implements OnInit {

  Modules = {
    T: 'Flight',
    H: 'Hotel',
    V: 'Visa',
    R: 'Transfer',
    K: 'Package'
  };
  codeModule: any;
  txMarkup: any;
  mntMarkup: any;
  addToPrice: any;
  newData: any;
  loading = false;

  commission: commissionDto = new commissionDto();
  constructor(
    private toastr: ToastrService,
    private commissionService: CommissionsService,
    private currencyPipe: CustomCurrencyPipe,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCommissionComponent>) {


  }

  ngOnInit(): void {


  }

  save() {
    this.loading = true;
    this.commissionService.add(this.commission).subscribe(
      data => {
        if (data) {
          this.toastr.success(this.translate.instant('Success'));
          this.loading = false;
          this.dialogRef.close(true)
        }
      },
      error => {
        this.toastr.error(this.translate.instant(error));
        this.loading = false;
        this.dialogRef.close()

        // event.confirm.reject();
      }
    );
  }

  disableButton() {
    if (!this.commission.addToPrice || !this.commission.codeModule || !this.commission.mntMarkup || !this.commission.txMarkup) {
      return true;
    }

  }
  onChange(event) {
    this.loading=true;
    this.commissionService.getCommissionByCodeModule(event.target.value).subscribe(data => {
      if (data) {
        this.loading=false;
        this.toastr.warning(this.translate.instant("Please select another module, Already exists"));
        this.commission.codeModule = "";

      } else {
        this.loading=false;
      }
    })
  }
}
