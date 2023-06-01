import { Component,EventEmitter,OnInit, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/views/authpage/auth.service';

import { AuthpageService } from 'src/app/views/authpage/authpage.service';

import { QrcodeModel } from 'src/app/views/authpage/tfa/tfa-models/QrcodeModel';
import { TFAModel } from 'src/app/views/authpage/tfa/tfa-models/TFAModel';
import { environment } from 'src/environments/environment';

import { LanguageService } from '../../services/language.service';
import { CanGenerateModel } from './can-generate-model';
import { SecurityService } from './security.service';
import { SecurityRequest } from './securityRequest';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  securityRequest: SecurityRequest= new SecurityRequest;

  public verificationcode : String ;
  public  CurrentUser : TFAModel = new TFAModel();
  public verification : boolean = false ;
  submittedLogin;
  loading: boolean;
  loadingFB: boolean;
  wrongAccountCode;
  captchaResponse;
 // recaptcha = environment.recaptcha;
  logoEntite ;

  @Output() backward = new EventEmitter();
  @Output() tfa = new EventEmitter();
  value: string;
  sub;
  public username : String   ;
  public imageUrl : String ;
  public password : String  ;
  public Qrcode : QrcodeModel = new QrcodeModel() ;
  shownext=false;
  qrCode=false;
  email=false;
  disable=false;
canGenerateModel:CanGenerateModel =new CanGenerateModel;
loadingSave:boolean
back:boolean = true


  constructor(
    public authPageService: AuthpageService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    public dialog: MatDialog,
  public dialogRef: MatDialogRef<SecurityComponent>,
  private toast: ToastrService,
  private securityService: SecurityService,
  private cookie:CookieService
  ) { }

  ngOnInit(): void {

    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.loginForm = new FormGroup({
      // accountCode: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      username: new FormControl('GSA050', [Validators.required]),
    });

  }
  async generateCode(){
    console.log(this.loginForm.value);
    console.log(this.username,this.password);
    this.loading=true
    this.Qrcode = await this.securityService.getQrcode(this.loginForm.get('username').value , this.loginForm.get('password').value).toPromise();
    this.loading=false

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


  save() {
     this.loadingSave =true;
     this.canGenerateModel.idEntite=this.cookie.get('idEntite')
     this.canGenerateModel.idUsertiers=this.cookie.get('idUserTiers')
     if(this.email){
      this.canGenerateModel.canGenerate='N'
      this.canGenerateModel.otpMail='O'
     }else if(this.qrCode){
      this.canGenerateModel.canGenerate='O'
      this.canGenerateModel.otpMail='N'
     }else if(this.disable){
      this.canGenerateModel.canGenerate='N'
      this.canGenerateModel.otpMail='N'
     }

     this.securityService.updateCanGenerateAndOtpMail(this.canGenerateModel).subscribe(data=>{
      if(data){
        this.toast.success('Authenticator generated successfully');
        this.dialogRef.close()

      }
      this.loadingSave=false
      console.log(data);

     },err=>{this.toast.error(err);})
  }

  showGoogle(event){
    console.log('hi',event.target.checked);

    this.qrCode=event.target.checked
    this.email=!event.target.checked
    this.disable=!event.target.checked

  }
  showEmail(event){
    this.email=event.target.checked
    this.qrCode=!event.target.checked
    this.disable=!event.target.checked


  }

  showDisable(event){
    this.email=!event.target.checked
    this.qrCode=!event.target.checked
    this.disable=event.target.checked
  }
  Back(){

    this.back =true;
    this.email=false
    this.qrCode=false
    this.disable=false
  }
}
