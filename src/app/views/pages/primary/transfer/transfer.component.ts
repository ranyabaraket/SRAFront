import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TransferService } from './transfer.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})


export class TransferComponent implements OnInit {
  @ViewChild('searchTransfer') el: ElementRef;
  country;
  pickUp;
  dropOff;
  inputDate = '';
  loadingSearch;
  latestSearch: any;
  constructor(
    public transferService: TransferService,
    private router: Router,
    public toastr: ToastrService,
    public dialog: MatDialog,
    private languageServise: LanguageService,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.latestSearch = this.transferService.getLatestSearch();
  }

  search(searchModel) {
    this.loadingSearch = true;
    this.router.navigate(['/pages/transfer/result/selection'], {
      state: {
        searchModel
      }
    });
  }
}

