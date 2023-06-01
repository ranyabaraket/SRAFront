import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgencyProfileService } from './agency-profile.service';
import { RefTiers } from '../files/hotel-history/hotel-history-details/voucher/reffTiers';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-agency-profile',
  templateUrl: './agency-profile.component.html',
  styleUrls: ['./agency-profile.component.scss']
})
export class AgencyProfileComponent implements OnInit, OnDestroy {
  refTiers: RefTiers = new RefTiers();
  token;
  pays: any;
  cities: any;
  tiersLogo;
  submitted;
  loadSave;
  loadReset;
  picture = false;
  sub1;
  sub2;
  constructor(
    private agencyProfileService: AgencyProfileService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private languageServise: LanguageService,
    public translate: TranslateService) {

  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  ngOnInit() {
    this.getRefTiers();
    this.getPays();
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }

  getRefTiers() {
    this.loadReset = true;
    this.sub1 = this.agencyProfileService.getRefTiers().subscribe(
      data => {
        this.refTiers = data;
        if (this.refTiers.tiersLogo) {
          this.tiersLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + this.refTiers.tiersLogo);
          this.picture = true;
        }

        if (this.refTiers.prmPays) {
          this.refTiers.idpays = this.refTiers.prmPays.idPays;
        }
        if (this.refTiers.prmCity) {
          this.refTiers.idCity = this.refTiers.prmCity.idCity;
        }
        this.getCities(this.refTiers.prmPays.idPays);
        this.loadReset = false;
      },
      err => {
        console.log(err);
        this.loadReset = false;

        this.toastr.error(this.translate.instant(err));
      }
    );
    // this.agencyProfileService.getReftiersLogo()
    //   .then((res: any) => {if (res){res.text(); }})          // convert to plain text
    //   .then(text => this.tiersLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + text));
 //   this.picture = true;
  }

  getPays() {
    this.sub2 = this.agencyProfileService.getPays().subscribe(
      data => {
        this.pays = data;
      },
      err => {
        this.toastr.error(this.translate.instant(err));
      }
    );
  }

  getCities(id) {
    this.cities = [];
    this.agencyProfileService.getCities(this.refTiers.idpays).subscribe(
      data => {
        this.cities = data;
        //  this.refTiers.idCity = this.cities.idCity;
      },
      err => {
        this.toastr.error(this.translate.instant(err));
      }
    );
  }

  onChangeCity(event) {
    this.refTiers.idCity = this.cities.find(g => g.lcity === String(event)).idCity;
  }

  save(saveForm) {
    this.submitted = true;
    if (saveForm.invalid) { return; }
    if (!this.picture) {
      this.toastr.error('Please add a picture');
      return;
    }
    this.loadSave = true;
    this.refTiers.idCity = Number(this.refTiers.idCity);
    this.agencyProfileService.saveLogo(this.refTiers.tiersLogo).subscribe();
    this.agencyProfileService.save(this.refTiers).subscribe(
      data => {
        this.loadSave = false;
        this.toastr.success('Success');
      },
      err => {
        this.toastr.error(err);
        this.loadSave = false;

        this.toastr.error(this.translate.instant(err));
      }
    );
  }

  preview(e: any): void {
    const files = e.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.tiersLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + btoa(binaryString));
    this.refTiers.tiersLogo = btoa(binaryString);
    this.picture = true;
  }

  // insert picture
  preview1(e: any): void {
    const render = new FileReader();
    render.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
      };
      img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }

}
