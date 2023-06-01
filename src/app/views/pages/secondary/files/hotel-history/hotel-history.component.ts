import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HotelHistoryService } from './hotel-history.service';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../../shared/services/language.service';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { exportElement } from '../../../shared/classes/export-element';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { NgxPrintModule } from 'ngx-print';
import { CookieService } from 'ng2-cookies';


export interface AutoCompleteCustmor {
  custmorId: any;
  custmorName: string;

}

  /**
   * interface table 
   */

  /* Static data */ 
  export interface TableElement {
    bookingId: any;
    uniqueId: any;
    voucherRef: any;
    hotelName: any;
    // cityName: any;
    resaNomprenom: any;
    dtCheckIn: any;
    dtCheckOut: any;
    nbnights: any;
    mntFacture: any;
    mntFraisAgent: any;
    codeDevise: any;
    etatResa: any;
    editedBy: any;
    createdDate: any;
    // dtResa: any;
    actions:any;
  }

@Component({
  selector: 'app-hotel-history',
  templateUrl: './hotel-history.component.html',
  styleUrls: ['./hotel-history.component.scss']
})
export class HotelHistoryComponent implements OnInit {
  @ViewChild('myTableElementId', { static: true }) el!: ElementRef<HTMLImageElement>;

  [x: string]: any;
  datePipe = new DatePipe('en-US');
  showDetails;
  Statuts = {
    A: 'Canceled', 
    C: 'Confirmed',
    P: 'In Process',
    R: 'Refund',
    V: 'Vouchered'
  };
  source = [];
  searchModel = {
    etat: '',
    ref: '',
    uniqueId: '',
    passenger: '',
    hotel: '',
    checkInPeriodFrom: null,
    checkInPeriodTo: null,
    checkOutPeriodFrom: null,
    checkOutPeriodTo: null,
    bookingDateFrom: null,
    bookingDateTo: null,
    // airline:''
  };
  loading: boolean;
  token;
  total = 0;
  minDate1;
  minDate;
  // data: { codeGds: any; uniqueId: any; idGds: any; };
  fileName = 'hotel_queue.xlsx';
  displayedColumns = ["bookingId", "uniqueId", "voucherRef","dtResa","hotelName","resaNomprenom","dtCheckIn","dtCheckOut", "nbnights","mntFacture","mntFraisAgent","codeDevise",
 "etatResa","editedBy", "createdDate"];
  ELEMENT_DATA: TableElement[] =[];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // codeDevise: string;

  constructor(
    private hotelHistoryService: HotelHistoryService,
    private toastr: ToastrService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private router: Router,
    private currencyPipe: CustomCurrencyPipe,
    private cookie: CookieService){
    // this.codeDevise=this.cookie.get('codeDevise')  
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
    this.source = [];
    this.total = 0;
    this.hotelHistoryService.search(this.searchModel).subscribe(
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
    searchForm.reset();
  }
  getBookingDetails() {

  }
  onUserRowSelect(event): void {
   
  }
    showDetail(element){
    this.showDetails = true;
    this.data = element;
    // Object.assign(this.data,{showVoucher:false})
   }
  cancel(ok: boolean) {
    this.showDetails = false;
  }

  exportexcel(): void {
    const element = document.getElementById('myTableElementId');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  public convetToPDF() {    
    const DATA = document.getElementById('myTableElementId');
    // const DATA = this.el.nativeElement;s    
    exportElement(DATA, {
      paperSize: 'A2',
      landscape: true,
      repeatHeaders: true,
      forcePageBreak: '.page-break',
      template: (data) => `<span class='pl-4'>Page ${data.pageNum} of
${data.totalPages}</span>`,
      margin: { left: '0.1cm', top: '1cm', right: '0.1cm', bottom: '1cm' },
    },
      'hotel_queue'
    );
  }
  onPrint(){
    
  }

formater(x) {
  if (x === '0' || x === 0 || x === null) { return '0.000'; }
  return this.currencyPipe.transform(x);
}


goToEdit(){

}
delete(){

}
sendmail(){
}

  
calculDiffDate(dtStart: any, dtEnd: any) {
  return Math.floor((new Date(dtEnd).getTime() - new Date(dtStart).getTime()) / 1000 / 60 / 60 / 24);
}

}

