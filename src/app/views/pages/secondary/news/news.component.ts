import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';
import { StoreNewsService } from './store-news.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowNewsComponent } from './show-news/show-news.component';
import { ValidateActionComponent } from '../../shared/validate-action/validate-action.component';
import { NewsService } from './news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  source;
  showDetails;
  total = 0;
  Etats = {
    // tslint:disable-next-line:object-literal-key-quotes
    'N': 'No',
   // tslint:disable-next-line:object-literal-key-quotes
    'O': 'Yes',
      // tslint:disable-next-line:object-literal-key-quotes
    'Y': 'Yes',
    '': 'No',
    null : 'No'
  };
  settings = {
       hideSubHeader: true,
      defaultStyle: false,
      attr: {
        class: 'table table-bordered table-striped'
      },
      pager: {
        display: true,
        perPage: 100
      },
    columns: {
      dateN: {
        title: this.translate.instant('Date'),
        filter: false,
        editable: false,
      },
      titreNews: {
        title: this.translate.instant('Title'),
        filter: false,
        editable: false
      },
      asRead: {
        title: this.translate.instant('Read'),
        filter: false,
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ title: this.translate.instant('Yes'), value: 'Y' },
            { title: this.translate.instant('No'), value: 'N' }]
          }
        },
        valuePrepareFunction: (value) => this.translate.instant(this.Etats[value]),
        // valuePrepareFunction: () => this._sanitizer.bypassSecurityTrustHtml(this.input),
      },
      readAccpt: {
        title: this.translate.instant('Accept'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.translate.instant(this.Etats[value]),
        editor: {
          type: 'list',
          config: {
            list: [{ title: this.translate.instant('Yes'), value: 'Y' },
            { title: this.translate.instant('No'), value: 'N' }]
          }
        },
      }
    }
    ,
    actions: {
      add: false,
      // edit: false,
      delete: false,
      custom: [{ name: 'customOption', title: '<img src="../../../assets/images/eye.png" class="btn-eye"/>' }],
      position: 'right'
    },
 //   mode: 'inline',
    edit: {
    
      editButtonContent: '<img src="../../../assets/images/edit.png" class="editButtonContent"/>',
      saveButtonContent: '<img src="../../../assets/images/save.png" class="btn-enregistrer">',
      cancelButtonContent: '<img src="../../../assets/images/delete.png" class="btn-remove "/>',
      confirmSave: true
    }


  };
  dataDetails: any;
  dataDetails1: any;
  loadingSearch = false;
  nbNews: any;
  constructor(
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    public translate: TranslateService,
    private dialogRef: MatDialog,
    //   private _sanitizer: DomSanitizer,
    public storeNewsService: StoreNewsService,
    private newsService: NewsService) {
  }

  ngOnInit() {
    this.getNews();
  }
  getNews() {
    //  this.loadingSearch = true;
    this.storeNewsService.getNews().subscribe(
      data => {
        this.source = data;
        if (data) { this.total = this.source.length ; }
      },
      error => {
        this.toastr.error(error);
       }
    );
    this.nbNews = this.storeNewsService.getnbUnreadNews();
  }
  customOption(event) {
    // this.showDetails = true;
    this.dataDetails = event.data;
    this.dialogRef.open(ShowNewsComponent, {
      width: '1350px',
      height: 'auto',
      data: this.dataDetails
    });
  }
  formatImg(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + img);
  }

  onUserRowSelect(event) {
    // console.log('accept/read 1.0', event.data);
    // this.selectedRows = event.selected;
  }

  onEditConfirm(model) {
    this.dialogRef.open(ValidateActionComponent, {
      data: this.translate.instant('Are You sure ?'),
      width: '400px',
      height: '160px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.newsService.markAsRead(model.newData).subscribe(
          data => {
            if (data) {
              model.confirm.resolve(model.newData);
              this.toastr.success(this.translate.instant('Success'));
            //   if (model.newData.asRead !== model.newData.data) {
            //     if (model.newData.asRead === 'Y') {
            //       this.storeNewsService.storenbUnreadNews(this.nbNews + 1);
            //     } else if (model.newData.asRead === 'N') {
            //       this.storeNewsService.storenbUnreadNews(this.nbNews - 1);
            //     }
            //  }
            } else {
              this.toastr.error(this.translate.instant('Error'));
              model.confirm.reject();
            }
          },
          error => {
            this.toastr.error(this.translate.instant(error));
            model.confirm.reject();
          }
        );
      }
    });
  }
}
