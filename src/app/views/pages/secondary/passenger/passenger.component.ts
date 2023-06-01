import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PassengerService } from './passenger.service';
import { CookieService } from 'ng2-cookies';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidateActionComponent } from '../../shared/validate-action/validate-action.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


export interface AutoCompleteCustmor {
  custmorId: any;
  custmorName: string;

}

  /**
   * interface table 
   */

  /* Static data */ 
  export interface TableElement {
    psgEmail:any;
    psgName:any;
    psgSurname:any;
    psgTel:any;
    actions:any;
  }
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit, OnDestroy {
  searchModel = { paxName: '', paxEmail: '', paxMobile: '' ,service:''};
 
  displayedColumns = ["paxEmail","paxTitle", "paxName","paxMobile","paxNationality","paxSexe","service","serviceDate"];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  source = [];
  loading;
  total = 0;
  element: HTMLElement;
  showEdit;
  editModel;
  sub: any;
  constructor(
    private toastr: ToastrService,
    private cookie: CookieService,
    private passengerService: PassengerService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public dialog: MatDialog) {

  }
  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }

  find() {
    this.loading = true;
    this.sub = this.passengerService.search(this.searchModel).subscribe(
      data => {
        this.source = data;
        this.loading = false;
        this.total = this.source.length;
      },
      error => {
        this.loading = false;
        this.toastr.error(error);
        this.toastr.error(this.translate.instant(error));
      }
    );
  }

  reset(searchForm) {
    searchForm.reset();
    this.source = [];
    this.total = 0;
  }
  onDeleteConfirm(deleteModel) {
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are You sure to remove this passenger ?'),
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.passengerService.delete(deleteModel.idPsg).subscribe(
          data => {
            if (data) {
              this.source = this.source.filter(s => s !== deleteModel);
              this.total--;
              this.toastr.success(this.translate.instant('Success'));
            } else {
              this.toastr.warning(this.translate.instant('action not allowed'));
            }
          },
          error => {
            this.toastr.error(error);
            this.toastr.error(this.translate.instant(error));
          }
        );
      }
    });

  }
  openEdit(event) {
    this.editModel = event.data;
    this.showEdit = true;
  }
  cancel(ok: boolean) {
    this.showEdit = false;
  }
  goToEdit(){

  }
  delete(){

  }
}
