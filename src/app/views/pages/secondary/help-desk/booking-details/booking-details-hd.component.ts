import { Component, OnInit } from '@angular/core';
import { BookingDetails } from '../../files/flight-history/flight-history-details/bookingDetails';
import { BookingDetailsHdService } from './booking-details-hd.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-booking-details-hd',
  templateUrl: './booking-details-hd.component.html',
  styleUrls: ['./booking-details-hd.component.scss']
})
export class BookingDetailsHdComponent implements OnInit {
  token;
  private sub: any;
  bookingDetails: BookingDetails = new BookingDetails();
  loading: boolean;

  constructor(
    private bookingDetailsService: BookingDetailsHdService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
      this.bookingDetailsService.getBookingDetails(params.numPnr, params.uniqueId, params.idTiers).subscribe(
        data => {
          this.bookingDetails = data;
          this.loading = false;
          // this.getPnrHistory();
        },
        err => { this.toastr.error(err); this.loading = false; }
      );
    });

  }

  exportAsPDF(firstName) {
    const data = document.getElementById('divDetails');
    // html2canvas(data).then(canvas => {
    //  // const pdf = new jspdf('l', 'cm', 'a4');
    //   pdf.save(firstName + '.pdf');
    // });
  }
  getSrcImg(codeCom) {
    return 'http://sra-sa.com:88/airelines/' + codeCom + '.png';
  }
}
