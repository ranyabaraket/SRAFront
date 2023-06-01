import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../pages/shared/services/language.service';
import { AuthService } from '../auth.service';
import { AuthpageService } from '../authpage.service';
import { LoginStateService } from '../login-form/login-state.service';
import { QrcodeModel } from './tfa-models/QrcodeModel';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-tfa',
  templateUrl: './tfa.component.html',
  styleUrls: ['./tfa.component.scss']
})
export class TfaComponent implements OnInit {
  public username : String   ;
  public imageUrl : String ;
  public password : String  ;
  public Qrcode : QrcodeModel = new QrcodeModel() ;
  
  @Output() backward = new EventEmitter();
  constructor(public authPageService: AuthpageService,
    private toast: ToastrService,
    private router: Router,
    private cookie: CookieService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private session: LoginStateService,
    private authservice: AuthService,
    public dialogRef: MatDialogRef<TfaComponent>) { }

  async ngOnInit(): Promise<void> {
  }
  async getQrcode() {
   console.log(this.username,this.password);
    this.Qrcode = await this.authservice.getQrcode(this.username , this.password).toPromise();
    console.log(this.Qrcode);
    if(this.Qrcode != null) {
     console.log(JSON.stringify(this.Qrcode));   
     this.imageUrl = this.Qrcode.qrCode ;
     this.toast.success('Qrcode generated successfully');
   }
   else {
     this.toast.error('Username or password Is incorrect ');
   }
   

  }
  openLogin(): void {
    console.log("BOM ") ;
    this.backward.emit(true);
  }
}
