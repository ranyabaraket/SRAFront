import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommissionsService } from './commissions.service';
import { CustomCurrencyPipe } from '../../shared/pipe/customCurrency.pipe';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidateActionComponent } from '../../shared/validate-action/validate-action.component';
import { MatPaginator } from '@angular/material/paginator';
import { AddCommissionComponent } from './add-commission/add-commission.component';
import { EditCommissionComponent } from './edit-commission/edit-commission.component';

export interface AutoCompleteCustmor {
  custmorId: any;
  custmorName: string;

}

/**
 * interface table 
 */

/* Static data */
export interface TableElement {
  codeModule: any;
  txMarkup: any;
  mntMarkup: any;
  addToPrice: any;
  refUser: any;
  dtCreate: any;
  drModif: any;
  actions: any;
}

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit, OnDestroy {
  source;
  token;
  submitted;
  loadSave;
  loadReset;
  Modules = {
    T: 'Flight',
    H: 'Hotel',
    V: 'Visa',
    R: 'Transfer',
    K: 'Package'
  };
  displayedColumns = ["codeModule", "txMarkup", "mntMarkup", "addToPrice","refUser","dtCreate","dtModif", "actions"];
  ELEMENT_DATA: TableElement[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  total = 0;
  sub;
  loading;
  constructor(
    private toastr: ToastrService,
    private commissionService: CommissionsService,
    private currencyPipe: CustomCurrencyPipe,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public dialog: MatDialog) {}
  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }
  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }
  getCommissions() {
    this.loading=true
    this.sub = this.commissionService.getCommissions().subscribe(
      data => {
        this.loading=false
        data.forEach(element => {
          element.mntMarkup = this.currencyPipe.transform(element.mntMarkup);
          element.Module = this.Modules[element.codeModule];
        });
        this.source = data;
        this.total = this.source.length;
      },
      error => {
        this.loading=false
        this.toastr.error(error);
      }
    );
  }
  onDeleteConfirm(deleteModel) {
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are You sure to remove this commission ?'),
      width: '400px',
      height: '200px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.commissionService.delete(deleteModel).subscribe(
          data => {
            if (data === 1) {
              this.source = this.source.filter(s => s !== deleteModel);
              this.total--;
              this.toastr.success(this.translate.instant('Success'));
            } else {
              this.toastr.error(this.translate.instant('Error'));
            }
          },
          error => {
            this.toastr.error(this.translate.instant(error));
          }
        );
      }
    });
  }
  add() {
    this.dialog.open(AddCommissionComponent, {
      data: this.translate.instant('Add Commission ?'),
      width: '620px',
      height: '320px',
    }).afterClosed().subscribe(result => {
      console.log('closed', result);
     if(result){
   this.getCommissions();
     }
    });
  }
  goToEdit(element) {
    this.dialog.open(EditCommissionComponent, {
      data: element,
      width: '620px',
      height: '320px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getCommissions()
            }
    });
  }
}
