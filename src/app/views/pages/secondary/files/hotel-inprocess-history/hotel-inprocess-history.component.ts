import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
// import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { exportElement } from '../../../shared/classes/export-element';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import * as XLSX from 'xlsx';
import { HotelInprocessHistoryService } from './hotel-inprocess-history.service';
import { LanguageService } from '../../../shared/services/language.service';
import { HotelHistoryService } from '../hotel-history/hotel-history.service';
// import jsPDF from 'jspdf';
// import { MatTableDataSource } from '@angular/material/table';
// import { Observable } from 'rxjs';
// import { NgxPrintModule } from 'ngx-print';

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
  selector: 'app-hotel-inprocess-history',
  templateUrl: './hotel-inprocess-history.component.html',
  styleUrls: ['./hotel-inprocess-history.component.scss']
})
export class HotelInprocessHistoryComponent implements OnInit {

  @ViewChild('myTableElementId', { static: true }) el!: ElementRef<HTMLImageElement>;

  [x: string]: any;
  datePipe = new DatePipe('en-US');
  showDetails;
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
  };
  loading: boolean;
  token;
  total = 0;
  minDate1;
  minDate;
  // data: { codeGds: any; uniqueId: any; idGds: any; };
  fileName = 'hotel_queue.xlsx';
  displayedColumns = ["bookingId", "uniqueId", "voucherRef","dtResa","hotelName","resaNomprenom","dtCheckIn","dtCheckOut", "nbnights","mntFacture","mntFraisAgent","codeDevise","editedBy", "createdDate"];
  ELEMENT_DATA: TableElement[] =[];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  codeDevise: string;
  constructor(
    private hotelHistoryService: HotelHistoryService,    private toastr: ToastrService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private currencyPipe: CustomCurrencyPipe,
    private cookie: CookieService
  ) { 
    this.codeDevise=this.cookie.get('codeDevise')  

  }

  ngOnInit(): void {
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
    this.hotelHistoryService.synchronize(this.searchModel).subscribe(
      data => {
        this.source = data;
        if(this.source){
        console.log("heree :: ", this.source);
        for (var i = 0; i < this.source.length; i++) {
          console.log("code gds is :: ", this.source[i].codeGds);
          this.hotelHistoryService.updateStatus(this.source[i].codeGds, this.source[i].voucherRef)
          
        }
        this.loading = false;
        this.total = this.source.length;
      }
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
