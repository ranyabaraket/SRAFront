import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { forkJoin } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { VisaService } from '../visa.service';
import { PrmDocumentVisaModel, RefWebVisaListModel, RefWebVisaModel } from './RefWebVisaListModel';

@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss']
})
export class VisaDetailsComponent implements OnInit {
  visaModel: any;
  loadingVisa = true;
  paxModel1: any = [];
  refVisaModel: RefWebVisaListModel = new RefWebVisaListModel();
  guestModel1: RefWebVisaModel = new RefWebVisaModel();
  guestModel11: RefWebVisaModel = new RefWebVisaModel();
  docx: any = [];
  guestModel12: PrmDocumentVisaModel = new PrmDocumentVisaModel();
  prixVisaData: any;
  priceToSend: Subject<[]> = new Subject<[]>();
  prixVisaData1: boolean;
  startDate: any;
  endDate: any;
  totalAmnt: any;
  submitted;
  info;
  downloadUrl: any;
  rescount = 0;
  totLength: any;
  disableBtn = false;
  eventBack: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    private toast: ToastrService,
    private visaService: VisaService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.model) {
        this.visaService.getPrixVisa(res.model.idDestination, res.model.idTypeVisa).subscribe(
          data => {
            this.prixVisaData1 = true;
            this.loadingVisa = false;
            this.prixVisaData = data;
            this.refVisaModel.prixVisa = data;
            this.priceToSend = data.prixVenteFinal + data.codeDeviseFinal;
            this.totalAmnt = (data.prixVenteFinal * res.model.nbrPax) + ' ' + data.codeDeviseFinal;
          }
        );
        this.visaModel = res.model;
        this.refVisaModel.paxName = res.model.fullName;
        this.refVisaModel.nbPax = res.model.nbrPax;
        this.refVisaModel.phoneNumber = res.model.phone;
        this.refVisaModel.endDate = res.model.returnDate;
        this.startDate = res.model.entryDate1;
        this.endDate = res.model.returnDate1;
        this.refVisaModel.typeVisa = res.model.typeVisa;
        this.refVisaModel.typeVisaT = res.model.visaType;
        this.refVisaModel.responsable = res.model.fullName;
        this.refVisaModel.startDate = res.model.entryDate;
        this.refVisaModel.emailContact = res.model.email;
        this.refVisaModel.visato = res.model.visato;
        this.refVisaModel.countryFrom = res.model.countryFrom;
        this.refVisaModel.idTypeVisa = res.model.idTypeVisa;

        for (let i = 0; i < res.model.nbrPax; i++) {
          this.guestModel1 = new RefWebVisaModel();
          this.guestModel1.documents = res.model.docList;
          this.paxModel1[i] = this.guestModel1;
        }
        this.paxModel1[0].fullName = res.model.fullName;
        this.totLength = this.refVisaModel.nbPax * res.model.docList.length;
      }
      else {
        this.router.navigate(['/pages/visa']);
        this.loadingVisa = false;
      }
    });

  }
  saveData() {
    this.loadingVisa = true;
    this.refVisaModel.listVisaApply = this.paxModel1;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.paxModel1.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.paxModel1[i].documents.length; j++) {
        this.fileChange(this.refVisaModel.listVisaApply[i].documents[j].urlFile, i, j);
      }
    }
  }

  async fileChange(file, i, j) {
    const formData = new FormData();
    formData.append('document_type_id', '3');
    formData.set('file', file);
    // to upload images to mayan....
    this.visaService.uploadImage(formData).subscribe(
      data => {
        this.info = data;
        this.sleep(3000);
        // get url link to download images from mayan
        this.visaService.getUrlFile(this.info.url).subscribe((urlFile) => {
          this.rescount += 1;
          this.downloadUrl = urlFile;
          this.refVisaModel.listVisaApply[i].documents[j].urlFile = this.downloadUrl.file_latest.download_url;
          if (this.rescount === this.totLength) {
            this.visaService.addNewVisa(this.refVisaModel).subscribe(
              result => {
                this.loadingVisa = false;
                this.disableBtn = true;
                this.toast.success(this.translate.instant(result.msg), this.translate.instant('SUCCESS'));
              }
            );
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  async init() {
    await this.sleep(1000);
  }

  visaDocx(event) {
    // this.eventBack = event;
    //  this.eventBack[event.index2][event.index1].urlFile = event.urlDoc;
  }

}
