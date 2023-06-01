import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomCurrencyPipe } from '../pipe/customCurrency.pipe';
import { MatDialog } from '@angular/material/dialog';
import { SendEmailComponent } from './send-email/send-email.component';
import { ValidateActionComponent } from '../validate-action/validate-action.component';
import { LoginStateService } from 'src/app/views/authpage/login-form/login-state.service';
import { CurrentSoldeService } from '../services/current-solde.service';
import { AuthpageService } from 'src/app/views/authpage/authpage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PagesService } from '../../pages.service';
import { MyProfilComponent } from './my-profil/my-profil.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  language;
  tiersName: string;
  idEntite: any;
  idTiers: any;
  credits: string;
  creditsLimit: string;
  callCenter: string;
  trUserName: string;
  codeDevise: string;
  dueAmount: string;
  address: string;
  email:string;
  logo:any;
  subMenu;

  constructor(
    private languageServise: LanguageService,
    private cookie: CookieService,
    private router: Router,
    public translate: TranslateService,
    private curencyPipe: CustomCurrencyPipe,
    private dialogRef: MatDialog,
    private session: LoginStateService,
    private currentSolde: CurrentSoldeService,
    private authPageService : AuthpageService,
    private sanitizer: DomSanitizer,
    private pagesService: PagesService) {
    currentSolde.currentSolde.subscribe(solde => this.credits = this.curencyPipe.transform(Math.round(parseFloat (solde))));
    if (this.cookie.get('tiersName')) {
      this.tiersName = this.cookie.get('tiersName');
      this.credits = this.curencyPipe.transform(this.cookie.get('credits'));
      this.creditsLimit = this.cookie.get('creditsLimit');
      this.callCenter = this.cookie.get('callCenter');
      this.trUserName = this.cookie.get('trUserName');
      this.codeDevise = this.cookie.get('codeDevise');
      this.address=this.cookie.get("address"),
      this.idEntite=this.cookie.get("idEntite");
      this.idTiers= this.cookie.get("idTiers");
      this.email= this.cookie.get("email");


      // this.pagesService.getLogo(this.idEntite).subscribe(data=>{
      //   console.log(data);
      //   this.logo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + data.logo);
      // })
    } else {
      this.router.navigate(['/auth']);
    }
    /**this.pagesService.getSecondaryModulesByIdEntite(this.idEntite).subscribe(data=>{
      this.subMenu = data
    })*/

    // this.pagesService.getSecondaryModules().subscribe(data=>{
    //   this.subMenu = data
    // })


  }

  ngOnInit() {
    this.getDueAmount(this.idEntite, this.idTiers);
    // tslint:disable-next-line: deprecation
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
        this.language = data === 'ar' ? 'العربية' : data === 'fr' ? 'Français' : 'English';
      } else {
        this.translate.setDefaultLang('en');
        this.language = 'English';
      }
    });
  }

  getDueAmount(idEntite: any, idTiers: any) {
    this.authPageService.getDueAmount(idEntite, idTiers).subscribe(
      data => {
        this.dueAmount = data;

      }
    );
  }
  changeLanguage(lang) {
    this.language = lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : 'English';
    this.languageServise.changeLanguage(lang);
    this.translate.use(lang);
  }
  logout() {
    // this.dialogRef.open(ValidateActionComponent, {
    //   data: this.translate.instant('Are you sure you want to logout?'),
    //   width: '400px',
    //   height: '160px',

    // }).afterClosed().subscribe(result => {
    //   if (result) {
        this.session.setUserLoggedIn(false);
        this.cookie.deleteAll('../');
        this.router.navigate(['/auth']);
        // this.dialogRef.closeAll();
    //   }
    // });

  }
  sendEmail() {
    this.dialogRef.open(SendEmailComponent, {
      width: '500px'
    });
  }
  goToProfil() {
    this.dialogRef.open(MyProfilComponent, {
      width: '500px'
    });
  }


}
