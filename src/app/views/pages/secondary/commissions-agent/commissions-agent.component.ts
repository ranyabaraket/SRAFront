import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommissionsAgentService} from './commissions-agent.service';
import { CustomCurrencyPipe } from '../../shared/pipe/customCurrency.pipe';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidateActionComponent } from '../../shared/validate-action/validate-action.component';
import { MatPaginator } from '@angular/material/paginator';
import { AddCommissionAgentComponent } from './add-commission-agent/add-commission-agent.component';
import { EditCommissionAgentComponent } from './edit-commission-agent/edit-commission-agent.component';

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
  txAgMarkup;
  mntAgMarkup;
  dtCreate;
  dtModif: any;
  refUser:any;
  actions: any;
}

@Component({
  selector: 'app-commissions-agent',
  templateUrl: './commissions-agent.component.html',
  styleUrls: ['./commissions-agent.component.scss']
})
export class CommissionsAgentComponent implements OnInit, OnDestroy {
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

  displayedColumns = ["codeModule", "txAgMarkup", "mntAgMarkup", "refUser","dtCreate","dtModif", "actions"];
  ELEMENT_DATA: TableElement[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  total = 0;
  sub;
  loading;
  constructor(
    private toastr: ToastrService,
    private commissionService: CommissionsAgentService,
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
  getCommissionsAgent() {
    this.loading=true
    this.sub = this.commissionService.getCommissions().subscribe(
      data => {
        this.loading=false
        data.forEach(element => {
          element.mntAgMarkup = this.currencyPipe.transform(element.mntAgMarkup);
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
    this.dialog.open(AddCommissionAgentComponent, {
      data: this.translate.instant('Add Commission ?'),
      width: '620px',
      height: '320px',
    }).afterClosed().subscribe(result => {
      console.log('closed', result);
      if(result){
       this.getCommissionsAgent();
      }
    });
  }
  goToEdit(element) {
    this.dialog.open(EditCommissionAgentComponent, {
      data: element,
      width: '620px',
      height: '320px',
    }).afterClosed().subscribe(result => {
      if(result){
       this.getCommissionsAgent()
      }
    });
  }
}
