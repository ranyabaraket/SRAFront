import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { LanguageService } from '../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
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
    id: any;
    numFact: any;
    tiersName: any;
    etatFact: any;
    numberOfTickets: any;
    totFactTtc: any;
    codeDevise: any;
    actions:any;
  }

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  searchModel = { dtFactStart: null, dtFactEnd: null };
  loading;
  token;
  source = [];
  total = 0;
  // settings = {
  //   hideSubHeader: true,
  //   defaultStyle: false,
  //   pager: {
  //     display: true,
  //     perPage: 100
  //   },
  //   attr: {
  //     class: 'table table-bordered table-striped'
  //   },
  //   columns: {
  //     id: {
  //       title: this.translate.instant('Inv. ID'),
  //       filter: false,
  //       type: 'html',
  //       valuePrepareFunction: (value) => value.idFact
  //     },
  //     numFact: {
  //       title: this.translate.instant('Inv. Ref.'),
  //       filter: false
  //     }
  //     ,
  //     tiersName: {
  //       title: this.translate.instant('Customer'),
  //       filter: false
  //     }
  //     ,
  //     etatFact: {
  //       title: this.translate.instant('Status'),
  //       filter: false,
  //       type: 'html',
  //       valuePrepareFunction: (value) => this.Statuts[value]
  //     }
  //     ,
  //     numberOfTickets: {
  //       title: this.translate.instant('Number of Tickets'),
  //       filter: false
  //     }
  //     ,
  //     totFactTtc: {
  //       title: this.translate.instant('Amount'),
  //       filter: false,
  //       type: 'html',
  //       valuePrepareFunction: (value) => this.currencyPipe.transform(value)
  //     }
  //     ,
  //     codeDevise: {
  //       title: this.translate.instant('Curr.'),
  //       filter: false
  //     }

  //   }
  //   ,
  //   actions: {
  //     add: false,
  //     edit: false,
  //     delete: false,
  //   }
  // };
  // Statuts = {
  //   A: 'Cancled',
  //   T: 'Totaly Paid',
  //   C: 'Confirmed',
  //   P: 'Partially Paid'
  // };
 
  displayedColumns = ["id", "numFact", "tiersName","etatFact","numberOfTickets","totFactTtc","codeDevise"];
   ELEMENT_DATA: TableElement[] =[];
   @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  @ViewChild('contentinv', { static: false }) content: ElementRef;
  sub1;
  sub2;
  constructor(
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
    private currencyPipe: CustomCurrencyPipe,
    private languageServise: LanguageService,
    public translate: TranslateService) {

  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    if (this.sub1) { this.sub1.unsubscribe(); }
  }
  find() {
    this.loading = true;
    this.sub1 = this.invoiceService.find(this.searchModel).subscribe(
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

  exportAsXLSX(): void {
    const xslTab = [];
    for (let i = 0; i < this.source.length; i++) {
      xslTab.push(
        {
          No: i + 1,
          'Inv. ID': this.source[i].id.idFact,
          'Inv. Ref.': this.source[i].numFact,
          Customer: this.source[i].tiersName,
          // tslint:disable-next-line: max-line-length
          Status: this.source[i].etatFact === 'A' ? 'Cancled' : this.source[i].etatFact === 'T' ? 'Totaly Paid' : this.source[i].etatFact === 'C' ? 'Confirmed' : 'Confirmed',
          'Number of Tkt': this.source[i].numberOfTickets,
          Amount: this.currencyPipe.transform(this.source[i].totFactTtc),
          'Curr.': this.source[i].codeDevise,
        });
    }
    this.invoiceService.exportAsExcelFile(xslTab, 'Invoice');
  }

  exportToPdf() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Invoice', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    const xslTab = [];
    for (let i = 0; i < this.source.length; i++) {
      xslTab.push(
        {
          No: i + 1,
          'Inv. ID': this.source[i].id.idFact,
          'Inv. Ref.': this.source[i].numFact,
          Customer: this.source[i].tiersName,
          // tslint:disable-next-line: max-line-length
          Status: this.source[i].etatFact === 'A' ? 'Cancled' : this.source[i].etatFact === 'T' ? 'Totaly Paid' : this.source[i].etatFact === 'C' ? 'Confirmed' : 'Confirmed',
          'Number of Tkt': this.source[i].numberOfTickets,
          Amount: this.currencyPipe.transform(this.source[i].totFactTtc),
          'Curr.': this.source[i].codeDevise,
        });
    }

    (doc as any).autoTable({
 //     head: head1,
      body: xslTab,
      theme: 'striped',
    });
    doc.save('Invoice.pdf');
  }

}
