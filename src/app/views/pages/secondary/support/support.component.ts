import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupportService } from './support.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ng2-cookies';
import { MatDialog } from '@angular/material/dialog';
import { SupportDetailsComponent } from './support-details/support-details.component';
import { ResponseSupportComponent } from './response-support/response-support.component';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidateActionComponent } from '../../shared/validate-action/validate-action.component';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit, OnDestroy {
  datePipe = new DatePipe('en-US');
  searchModel = {
    idNotif: '',
    dtNotif: '',
    sentTo: '',
    notifStatus: ''
  };
  total = 0;
  status = {
    E: 'PENDING',
    A: 'CANCELED',
    T: 'RESOLVED',
    R: 'REJECTED',
    C: 'CLOSED',
    P: 'IN PROCESS'
  };

  sentTo = {
    S: 'IT SUPPORT',
    F: 'FINANCE',
    H: 'HELP DESK',
    A: 'ADMINISTRATOR',
    C: 'CUSTOMER',
    G: 'GSA (Administrator)'
  };
  statusList = [{ name: 'PENDING', value: 'E' },
  { name: 'CANCELED', value: 'A' },
  { name: 'RESOLVED', value: 'T' },
  { name: 'REJECTED', value: 'R' },
  { name: 'CLOSED', value: 'C' },
  { name: 'IN PROCESS', value: 'P' }];
  sentToList = [{ name: 'IT SUPPORT', value: 'S' },
  { name: 'FINANCE', value: 'F' },
  { name: 'HELP DESK', value: 'H' },
  { name: 'ADMINISTRATOR', value: 'A' },
  { name: 'CUSTOMER', value: 'C' },
  { name: 'GSA (Administrator)', value: 'G' }];
  settings = {
 //   hideSubHeader: true,
    defaultStyle: false,
    pager: {
      display: true,
      perPage: 100
    },
    attr: {
      class: 'table table-bordered table-striped'
    },
    columns: {
      id: {
        title: this.translate.instant('Reference'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => value.idNotif
      },
      customer: {
        title: this.translate.instant('Customer'),
        filter: false,
      }
      ,
      dtNotif: {
        title: this.translate.instant('Date'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy hh:mm')
      }
      ,
      sentBy: {
        title: this.translate.instant('Sent by'),
        filter: false,
      },
      sentTo: {
        title: this.translate.instant('Sent to'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.sentTo[value]
      }
      ,
      notifTitle: {
        title: this.translate.instant('Notif title'),
        filter: false,
      }

      ,
      notifStatus: {
        title: this.translate.instant('Notif status'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === 'C' || value === 'T') { return '<a class="text-success">' + this.status[value] + '</a>'; }
          if (value === 'R' || value === 'A') { return '<a class="text-danger">' + this.status[value] + '</a>'; }
          if (value === 'P') { return '<a class="text-info">' + this.status[value] + '</a>'; }
          return '<a  >' + this.status[value] + '</a>';
        }
      }

    }
    ,
    actions: {
      position: 'right',
      custom: [{
        name: 'ourCustomAction', title: '<i class="far fa-comments action mr-2" title="Responde"></i>',
      }],
    },
    mode: 'external',
    edit: {
      editButtonContent: '<i class="far fa-edit action" title="Edit"></i>',
    },
    add: {
      addButtonContent: '<i class="fas fa-plus action" title="Add"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="far fa-trash-alt action" title="Delete"></i>',
      confirmDelete: true,
    }
  };
  source = [];
  token;
  loading;
  statuts: any;
  statutsList = [];
  sentoList = [];
  sub: any;
  constructor(private supportService: SupportService,
              private toastr: ToastrService,
              private cookie: CookieService,
              public dialog: MatDialog,
              private languageServise: LanguageService,
              public translate: TranslateService, ) {

  }

  ngOnInit() { }
  ngOnDestroy(): void {
    this.dialog.closeAll();
    if ( this.sub)
    {this.sub.unsubscribe(); }
  }
  find() {
    this.loading = true;
    this.sub = this.supportService.search(this.searchModel).subscribe(
      data => {
        this.source = data;
        this.loading = false;
        this.total = this.source.length;
      },
      error => {
        this.toastr.error(error);
        this.loading = false;
      }
    );
  }
  onDeleteConfirm(deleteModel) {
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are You sure to remove this Notification ?'),
      width: '400px',
      height: '170px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.supportService.delete(deleteModel).subscribe(
          data => {
            if (data) {
              this.source = this.source.filter(s => s !== deleteModel);
              this.total--;
              this.toastr.success('Success');
            } else {
              this.toastr.error('Error');
            }
          },
          error => {
            this.toastr.error(error);
          }
        );
      }
    });
  }
  onEdit(event) {
    const dialogRef = this.dialog.open(SupportDetailsComponent, {
      data: event.data,
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.find();
      }
    });
  }
  onAdd() {
    const dialogRef = this.dialog.open(SupportDetailsComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.find();
      }
    });
  }
  onResponse(event) {
    const dialogRef = this.dialog.open(ResponseSupportComponent, {
      width: '700px',
      data: event.data,
    });
  }
  reset(searchForm) {
    searchForm.reset();
    this.source = [];
  }
}
