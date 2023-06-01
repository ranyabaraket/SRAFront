import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TransactionJournalService } from './transaction-journal.service';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { LanguageService } from '../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
    dtCreate:any;
    refBook:any;
    libService:any;
    typeDoc:any;
    credit:any;
    debit:any;
    mntSoldeTiers:any;
    codeDevise:any;
    trUserName:any;
  }

@Component({
  selector: 'app-transaction-journal',
  templateUrl: './transaction-journal.component.html',
  styleUrls: ['./transaction-journal.component.scss']
})
export class TransactionJournalComponent implements OnInit, OnDestroy {
  datePipe = new DatePipe('en-US');
  searchModel = { idGds: null, natOpr: null, refBook: null, startDt: null, endDate: null };
  source = [];
  gds;
  loading;
  total = 0;
 displayedColumns = ["dtCreate", "refBook", "libService","typeDoc","credit","debit","mntSoldeTiers","codeDevise","trUserName"];
   ELEMENT_DATA: TableElement[] =[];
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  sub1: any;
  sub2: any;
  debit;
  credit;

  constructor(
    private transactionJournalService: TransactionJournalService,
    private toastr: ToastrService,
    private currencyPipe: CustomCurrencyPipe,
    private languageServise: LanguageService,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.getGds();
  }
  ngOnDestroy(): void {
    if (this.sub1) { this.sub1.unsubscribe(); }
    if (this.sub2) { this.sub2.unsubscribe(); }
  }

  find() {
    this.loading = true;
    this.sub1 = this.transactionJournalService.find(this.searchModel).subscribe(
      data => {
        this.source = data;
        this.loading = false;
        this.total = this.source.length;
      },
      error => {
        this.loading = false;
        this.toastr.error(error);
      }
    );
  }
  reset(searchForm) {
    this.total = 0;
    this.source = [];
    this.searchModel = { idGds: null, natOpr: null, refBook: null, startDt: null, endDate: null };
  }
  getGds() {
    this.sub1 = this.transactionJournalService.getGds().subscribe(
      data => {
        this.gds = data;
      },
      err => console.log(err)
    );
  }

  exportAsXLSX(): void {
    const xslTab = [];
    for (let i = 0; i < this.source.length; i++) {
      if (this.source[i].natOpr === 'D') {
        this.debit = this.currencyPipe.transform(this.source[i].mntVerser);
        this.credit = '0.00';
      }
      if (this.source[i].natOpr === 'C') {
        this.credit = this.currencyPipe.transform(this.source[i].mntVerser);
        this.debit = '0.00';
      }
      xslTab.push(
        {
          No: i + 1,
          Date: this.source[i].dtCreate,
          'Unique ID': this.source[i].refBook,
          'Transaction Title': this.source[i].libService,
          'Doc. type': this.source[i].typeDoc,
          Credit: this.credit,
          Debit: this.debit,
          Balance: this.currencyPipe.transform(this.source[i].mntSoldeTiers),
          'Curr.': this.source[i].codeDevise,
          User: this.source[i].trUserName,
        });
    }
    this.transactionJournalService.exportAsExcelFile(xslTab, 'TransactionJournal');
  }

  exportToPdf() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Transaction journal', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const xslTab = [];

    for (let i = 0; i < this.source.length; i++) {
      if (this.source[i].natOpr === 'D') {
        this.debit = this.currencyPipe.transform(this.source[i].mntVerser);
        this.credit = '0.00';
      }
      if (this.source[i].natOpr === 'C') {
        this.credit = this.currencyPipe.transform(this.source[i].mntVerser);
        this.debit = '0.00';
      }
      xslTab.push(
        {
          No: i + 1,
          Date: this.source[i].dtCreate,
          'Unique ID': this.source[i].refBook,
          'Transaction Title': this.source[i].libService,
          'Doc. type': this.source[i].typeDoc,
          Credit: this.credit,
          Debit: this.debit,
          Balance: this.currencyPipe.transform(this.source[i].mntSoldeTiers),
          'Curr.': this.source[i].codeDevise,
          User: this.source[i].trUserName,
        });
    }

    (doc as any).autoTable({
 //     head: head1,
      body: xslTab,
      theme: 'striped',
    });
    doc.save('TransactionJournal.pdf');
  }

}
