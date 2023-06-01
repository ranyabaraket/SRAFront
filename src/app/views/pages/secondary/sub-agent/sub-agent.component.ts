import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubAgentService } from './sub-agent.service';
import { CookieService } from 'ng2-cookies';
import { RefUtilisateurTiers } from './refUtilisateurTiers';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { SubAgentDetailsComponent } from './sub-agent-details/sub-agent-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { ValidateActionComponent } from '../../shared/validate-action/validate-action.component';
import { TransferHistoryService } from '../files/transfer-history/transfer-history.service';
import { CommissionAgentListComponent } from './commission-agent-list/commission-agent-list.component';
import { AutorisationAgentComponent } from './autorisation-agent/autorisation-agent.component';

export interface AutoCompleteCustmor {
  custmorId: any;
  custmorName: string;

}

/**
 * interface table 
 */

/* Static data */
export interface TableElement {
  country: any;
  trUserName: any;
  trUserEmail: any;
  trUserMobile: any;
  trUserLogin: any;
  actifTruser: any;
  isAdmin:any;
  actions: any;
}

@Component({
  selector: 'app-sub-agent',
  templateUrl: './sub-agent.component.html',
  styleUrls: ['./sub-agent.component.scss']
})


export class SubAgentComponent implements OnInit, OnDestroy {

  displayedColumns = ["country", "trUserName", "trUserEmail", "trUserMobile", "trUserLogin", "actifTruser", "isAdmin","actions"];
  ELEMENT_DATA: TableElement[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  photo: any;
  changePhoto: boolean = false;

  resetCretertias(searchForm) {
    searchForm.reset();
  }



  source;
  token;
  total = 0;
  refUtilisateurTiers: RefUtilisateurTiers = new RefUtilisateurTiers();
  img;
  img2 = null;
  fonctions;
  loadSave;
  loadReset;
  submitted;
  pays;
  devise: any;
  subpays;
  subusers;
  subdevise;
  picture = false;
  codeDevise: string;
  indexTel: any;
  trUserMobile: any;
  addView = false;
  idEntite: any;
  idTiers: any;
  idUserTiers: any;
  idUserCash: any;
  data: any;
  searchModel = {
    email: null,
    mobile: '',
  };

  loading: boolean;
  /**
   * declare variable for update bloc
   */
  refUtilisateurTiersUpdated: RefUtilisateurTiers = new RefUtilisateurTiers();
  candisplayAll = false;
  canSearch = false;
  canSelect = false;
  canBook = false;
  canOrderTicket = false;
  canCancel = false;
  canAddUser = false;
  canActifTruser = false;
  canOptmail = false;
  canGenerate = false
  canDisplayProvider = false
  loadEdit;

  constructor(
    private subAgentService: SubAgentService,
    private sanitizer: DomSanitizer,
    private cookie: CookieService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private dialogRef: MatDialog,
  ) {
    this.idEntite = this.cookie.get("idEntite");
    this.idTiers = this.cookie.get("idTiers");
    this.idUserTiers = this.cookie.get("idUserTiers");
    this.idUserCash = this.cookie.get("idUserCash");
  }
  ngOnDestroy(): void {
    this.dialog.closeAll();
    this.subpays.unsubscribe();
    // this.subusers.unsubscribe();
    this.subdevise.unsubscribe();
  }
  ngOnInit() {




    // this.getUsers();
    this.subAgentService.getFonctions(this.idEntite).subscribe(
      data => {
        this.fonctions = data;
      }
    );
    this.codeDevise = this.cookie.get('codeDevise');
    this.getPays();
    this.getDevise();
  }
  getPays() {
    this.subpays = this.subAgentService.getPays().subscribe(
      data => {
        this.pays = data;
      },
      err => console.log(err)
    );
  }
  getDevise() {
    this.subdevise = this.subAgentService.getDevise().subscribe(
      data => {
        this.devise = data;
        this.refUtilisateurTiers.idDevise = this.devise.find(item => item.codeDevise === this.codeDevise).idDevise;
      },
      err => console.log(err)
    );
  }
  // getUsers() {
  //   this.subusers = this.subAgentService.getUsers().subscribe(
  //     data => {
  //       this.source = data;
  //       this.total = this.source.length;
  //     },
  //     err => console.log(err)
  //   );
  // }

 onChangeCountry (event) {
    this.indexTel = this.pays.find(g => g.idPays === Number(event.target.value)).indTelPays;
  }
  save(saveForm) {
    this.submitted = true;
    if (saveForm.invalid) { return; }
    this.loadSave = true;
    // // this.refUtilisateurTiers.refUser = this.token.sub;
    this.refUtilisateurTiers.trUserMobile = this.indexTel.concat(this.trUserMobile);
    this.subAgentService.save(this.refUtilisateurTiers, this.idEntite, this.idTiers, this.idUserTiers, this.idUserCash).subscribe(
      data3 => {
        console.log("data here are : ", data3);

        if (data3 === 'Exist') {
          this.toastr.error('User already exists');
          this.loadSave = false;
        } else {

          this.loadSave = false;
          this.submitted = false;
          // this.getUsers();
          this.toastr.success('Success');
          saveForm.reset();
        }
      },
      err => {
        this.toastr.error(err);
        this.loadSave = false;
        this.submitted = false;
      });
  }

  changeValue(v) {
    if (v == 'O') {
      return v = 'N';
    } else {
      return v = 'V';
    }
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

  find() {
    this.loading = true;
    this.source = [];
    this.total = 0;
    this.refUtilisateurTiersUpdated = new RefUtilisateurTiers()

    this.subAgentService.search(this.searchModel, this.idEntite, this.idTiers).subscribe(
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

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + btoa(binaryString));
    this.refUtilisateurTiers.userPhoto = btoa(binaryString);
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
  onEditConfirm(event) {
    console.log("reftiers here is : ", event);
    const dialogRef = this.dialog.open(SubAgentDetailsComponent, {
      data: {

        subAgent: event,
        pays: this.pays,
        devises: this.devise
      },
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) { this.getUsers(); }
    });
  }

  exportAsPDF() {
    //  this.exportAsService.save(this.exportAsConfig, 'SubAgent').subscribe(() => {
    // });
  }

  showAdd() {
    this.addView = !this.addView;
  }

  goToEdit() {

  }
  updateTiersActif(element) {
    let actifTruser = '';
    if (element.actifTruser === 'O') {
      actifTruser = 'N'
    } else if (element.actifTruser === 'N') {
      actifTruser = 'O'
    }
    this.dialogRef.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to change user status ?'),
      width: '450px',
      height: '250px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.subAgentService.updateActifTruser(element, actifTruser).subscribe(data => {
          if (data) {
            this.toastr.success('success Updated');
            let index = this.source.indexOf(element)
            element.actifTruser = actifTruser
            this.source[index] = element
            this.dialogRef.closeAll();

          }
        })
      }
    });

  }
  getCommission(element) {
    this.subAgentService.getCommissionByCodeModule(element.id.idUsertiers, 'H').subscribe(data => {
      if (data) {
        this.dialogRef
          .open(CommissionAgentListComponent, {
            data: data,
            width: '800px',
            // height: '170px',
          })
      } else {
        this.toastr.warning('Commisssion Not Found For This Sub Agent')
      }
    });
  }

  setModalUpdate(element) {
    this.img2 = null
    this.changePhoto = false
    this.candisplayAll = element.displayAll == 'O' ? true : false
    this.canSearch = element.search == 'O' ? true : false
    this.canSelect = element.select == 'O' ? true : false
    this.canBook = element.book == 'O' ? true : false
    this.canOrderTicket = element.orderticket == 'O' ? true : false
    this.canCancel = element.cancel == 'O' ? true : false
    this.canAddUser = element.addUser == 'O' ? true : false
    this.canActifTruser = element.actifTruser == 'O' ? true : false
    this.canGenerate = element.canGenerate == 'O' ? true : false
    this.canOptmail = element.otpMail == 'O' ? true : false
    this.canDisplayProvider = element.displayProvider == 'O' ? true : false
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + element.userPhoto);
    console.log(this.photo);



    this.refUtilisateurTiersUpdated = element


  }


  edit() {

    const country = this.pays.find(element => element.idPays == this.refUtilisateurTiersUpdated.idPays);
    console.log(country);

    this.refUtilisateurTiersUpdated.country = country.lpays

    this.loadEdit = true;
    this.subAgentService.edit(this.refUtilisateurTiersUpdated, this.idUserTiers).subscribe(
      data => {
        if (data) {
          this.toastr.success('Success');
          this.loadEdit = false;
          let index = this.source.indexOf(this.refUtilisateurTiers)
          this.source[index] = this.refUtilisateurTiers
        }
      },
      err => {
        console.log(err);
        this.toastr.error(err);
        this.loadEdit = false;
      }
    );
  }

  onChangeDisplayAll(): void {
    if (this.candisplayAll == true) {
      this.refUtilisateurTiersUpdated.displayAll = 'O'
    } else {
      this.refUtilisateurTiersUpdated.displayAll = 'N'
    }
  }

  onChangeSearch(): void {
    if (this.canSearch == true) {
      this.refUtilisateurTiersUpdated.search = 'O'
    } else {
      this.refUtilisateurTiersUpdated.search = 'N'
    }
  }
  onChangeSelect(): void {
    if (this.canSelect == true) {
      this.refUtilisateurTiersUpdated.select = 'O'
    } else {
      this.refUtilisateurTiersUpdated.select = 'N'
    }
  }

  onChangeBook(): void {
    if (this.canBook == true) {
      this.refUtilisateurTiersUpdated.book = 'O'
    } else {
      this.refUtilisateurTiersUpdated.book = 'N'
    }
  }

  onChangeOrderTicket(): void {
    if (this.canOrderTicket == true) {
      this.refUtilisateurTiersUpdated.orderticket = 'O'
    } else {
      this.refUtilisateurTiersUpdated.orderticket = 'N'
    }
  }

  onChangeCancel(): void {
    if (this.canCancel == true) {
      this.refUtilisateurTiersUpdated.cancel = 'O'
    } else {
      this.refUtilisateurTiersUpdated.cancel = 'N'
    }
  }
  onChangeAddUser(): void {
    if (this.canAddUser == true) {
      this.refUtilisateurTiersUpdated.addUser = 'O'
    } else {
      this.refUtilisateurTiersUpdated.addUser = 'N'
    }
  }

  onChangeActifTrUser(): void {
    if (this.canActifTruser == true) {
      this.refUtilisateurTiersUpdated.actifTruser = 'O'
    } else {
      this.refUtilisateurTiersUpdated.actifTruser = 'N'
    }
  }
  onChangeOtpMail(): void {
    if (this.canOptmail == true) {
      this.refUtilisateurTiersUpdated.otpMail = 'O'
    } else {
      this.refUtilisateurTiersUpdated.otpMail = 'N'
    }
  }

  onChangeCanGenerate(): void {
    if (this.canGenerate == true) {
      this.refUtilisateurTiersUpdated.canGenerate = 'O'
    } else {
      this.refUtilisateurTiersUpdated.canGenerate = 'N'
    }
  }

  onChangeDisplayProvider(): void {
    if (this.canDisplayProvider == true) {
      this.refUtilisateurTiersUpdated.displayProvider = 'O'
    } else {
      this.refUtilisateurTiersUpdated.displayProvider = 'N'
    }
  }

  /**
   * image update
   */
  _handleReaderLoaded1(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.img2 = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + btoa(binaryString));
    this.refUtilisateurTiersUpdated.trUserPhoto = btoa(binaryString);
    this.picture = true;
  }
  // insert picture
  preview2(e: any): void {
    this.changePhoto = true;
    const render = new FileReader();
    render.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
      };
      img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }
  preview3(e: any): void {
    const files = e.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  autorisation(element){

    this.dialogRef.open(AutorisationAgentComponent, {
      data: element,
      width: '800px',
      // height: '250px',

    }).afterClosed()
    // this.subAgentService.getCommissionByCodeModule(element.id.idUsertiers, 'H')
    // .subscribe(data => {
    //   if (data) {
    //     this.dialogRef
    //       .open(AutorisationAgentComponent, {
    //         data: data,
    //         width: '800px',
    //         height: '170px',
    //       })
    //   } else {
    //     this.toastr.warning('User Module Not Found For This Sub Agent')
    //   }
    // });
  }
}

