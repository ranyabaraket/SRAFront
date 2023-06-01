import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpDeskService } from '../help-desk.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ng2-cookies';
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
    uniqueId:any;
    customer:any;
    typeReq:any;
    sector:any;
    airline:any;
    passengers:any;
    travelDt:any;
    dtReq:any;
    refUser:any;
    traitedDate:any;
    traitedBy:any;
    statusReq:any;
    actions:any;
  }
@Component({
  selector: 'app-in-process',
  templateUrl: './in-process.component.html',
  styleUrls: ['./in-process.component.scss']
})
export class InProcessComponent implements OnInit {
  displayedColumns = ["uniqueId", "customer", "typeReq","sector","airline","passengers","travelDt","dtReq","refUser",
  "traitedDate","traitedBy","statusReq","actions"];
   ELEMENT_DATA: TableElement[] =[];
   @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  // settings = {
  //   columns: {
  //     idRequest: {
  //       title: 'PTR ID',
  //       filter: false,
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<a href=\'/pages/help-desk/request-details/' + row.uniqueId + '\'>' + row.idRequest + '</a>';
  //       },
  //     },
  //     uniqueId: {
  //       title: 'Unique ID',
  //       filter: false,
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<a href=\'/pages/help-desk/booking-details/' + row.uniqueId + '\'>' + row.uniqueId + '</a>';
  //       },
  //     }
  //     ,
  //     customer: {
  //       title: 'Client',
  //       filter: false
  //     }
  //     ,
  //     typeReq: {
  //       title: 'Request Type',
  //       filter: false,
  //     }
  //     ,
  //     sector: {
  //       title: 'Sector',
  //       filter: false
  //     }
  //     ,
  //     airline: {
  //       title: 'Airline',
  //       filter: false
  //     }
  //     ,
  //     passengers: {
  //       title: 'Passenger Name',
  //       filter: false
  //     }
  //     ,
  //     travelDt: {
  //       title: 'Travel Date',
  //       filter: false
  //     },
  //     dtReq: {
  //       title: 'Requested On',
  //       filter: false
  //     }
  //     ,
  //     refUser: {
  //       title: 'Requested By',
  //       filter: false
  //     }
  //     ,
  //     traitedDate: {
  //       title: 'Traited On',
  //       filter: false
  //     }
  //     ,
  //     traitedBy: {
  //       title: 'Traited By',
  //       filter: false
  //     }
  //     ,
  //     statusReq: {
  //       title: 'Status',
  //       filter: false
  //     }
  //   }
  //   ,
  //   actions: {
  //     add: false,
  //     edit: false,
  //     delete: false,
  //     //  custom: [{ name: 'ourCustomAction', title: '<i class="far fa-list-alt action"></i>' }],
  //     position: 'right'
  //   },

  // };
  source = [];
  total = 0;
  token;
  constructor(
    private helpDeskService: HelpDeskService,
    private toastr: ToastrService,
    private cookie: CookieService) {
  }


  ngOnInit() {
    this.getRequests();
  }
  getRequests() {
    this.helpDeskService.getRequests('inProcess').subscribe(
      data => {
        this.source = data;
        this.total = this.source.length;
      },
      error => {
        this.toastr.error(error);
      }
    );
  }

  goToEdit(){

  }
  delete(){
    
  }
}
