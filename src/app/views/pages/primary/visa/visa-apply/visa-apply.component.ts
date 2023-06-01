import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VisaService } from '../visa.service';
import { LanguageService } from '../../../shared/services/language.service';
import { ApplyVisaModel } from './applyVisaModel';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VisaInstructionComponent } from './visa-instruction/visa-instruction.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visa-apply',
  templateUrl: './visa-apply.component.html',
  styleUrls: ['./visa-apply.component.scss']
})
export class VisaApplyComponent implements OnInit {
  listNationalities: any;
  applyModel: ApplyVisaModel = new ApplyVisaModel();
  datePipe = new DatePipe('en-US');
  start = new Date();
  endDate = new Date();
  submitted: boolean;
  visaTypeList = [
    { value: 'Y', name: 'Touristic' },
    { value: 'C', name: 'Business' },
    { value: 'F', name: 'conference' },
    { value: 'W', name: 'Study' },
  ];
  listPurpose: any;
  isPurpose = true;
  dataToSend: any = [];
  listInstruction: any = [];
  dateR = true;
  loadingVisa = true;
  listDocx: any = [];

  constructor(
    private visaService: VisaService,
    private languageServise: LanguageService,
    public dialog: MatDialog,
    private toast: ToastrService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.applyModel.nbrPax = 1;
    this.getPays();
    document.getElementById('DropdownPax').addEventListener('click', e => {
      e.stopPropagation();
    });
    this.applyModel.visaType = 'Y';
  }

  getPays() {
    this.visaService.getPays().subscribe(
      data => {
        this.listNationalities = data;
        this.loadingVisa = false;
      },
      err => console.log(err)
    );
  }

  getVisaType(idPays) {
    this.visaService.getTypeVisa(idPays).subscribe(
      data => {
        this.listPurpose = data;
        this.isPurpose = false;
      }
    );
  }

  changeValueClass(value) {
    this.applyModel.visaType = value;
  }

  selectedItem(array, value) {
    const item = array.find(a => a.value === value);
    if (item) {
      return item.name;
    }
    return '';
  }

  onChangeOriginCountry(event) {
    this.applyModel.originCountry = event.target.value;
    this.applyModel.idPays = this.listNationalities.find(g => g.lpays === (event.target.value)).idPays;
    this.applyModel.countryFrom = this.listNationalities.find(g => g.lpays === (event.target.value));

  }
  onChangeDestCountry(event) {
    this.applyModel.destination = event.target.value;
    this.applyModel.idDestination = this.listNationalities.find(g => g.lpays === (event.target.value)).idPays;
    this.getVisaType(this.applyModel.idDestination);
    this.applyModel.visato = this.listNationalities.find(g => g.lpays === (event.target.value));
  }
  onChangePurpose(event) {
    this.applyModel.purposeOfVisit = event.target.value;
    this.applyModel.typeVisa = this.listPurpose.find(item => item.ltypevisa === event.target.value);
    this.applyModel.idTypeVisa = this.listPurpose.find(b => b.ltypevisa === (event.target.value)).id.idTypevsa;
    this.visaService.getVisaInstruction(this.applyModel.idDestination, this.applyModel.idTypeVisa).subscribe(
      data => {
        this.listInstruction.documents = data.documents;
        this.listInstruction.instruction = data.instruction;
        //     this.applyModel.docList = new PrmDocumentVisaModel();
        this.applyModel.docList = this.listInstruction.documents;
      }
    );
  }

  disableButtonNext() {
    // tslint:disable-next-line: max-line-length
    if (!this.applyModel.fullName || !this.applyModel.destination || !this.applyModel.originCountry || !this.applyModel.phone || !this.applyModel.entryDate || !this.applyModel.returnDate || !this.applyModel.email) {
      return true;
    }
  }
  disableButtonIntruction() {
    if (!this.applyModel.purposeOfVisit) {
      return true;
    }
  }
  reset() {
    this.applyModel = new ApplyVisaModel();
    this.applyModel.visaType = 'Y';
    this.applyModel.nbrPax = 1;
  }

  visitPorpose() {
    if (this.listInstruction.documents.length === 0 && this.listInstruction.instruction.length === 0) {
      this.toast.warning(this.translate.instant('Empty list'), this.translate.instant('WARNING'));
      return;
    }
    this.dialog.open(VisaInstructionComponent, {
      data: this.listInstruction,
      width: '1200px',
      height: 'auto',
    });
  }
  getApplyhModel() {
    for (let i = 0; i < this.applyModel.nbrPax; i++) {
      this.listDocx[i] = this.listInstruction.documents;
    }
    this.applyModel.entryDate1 = this.datePipe.transform(this.applyModel.entryDate, 'dd-MM-yyyy');
    this.applyModel.returnDate1 = this.datePipe.transform(this.applyModel.returnDate, 'dd-MM-yyyy');
    // this.applyModel.docList =  this.listDocx;
    return this.applyModel;
  }

  changeEventCheckIn(event) {
    this.endDate = event.target.value;
    this.dateR = false;
  }

}
