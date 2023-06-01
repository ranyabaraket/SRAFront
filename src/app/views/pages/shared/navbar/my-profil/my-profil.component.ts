import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ConfirmPasswordValidator } from '../../pipe/confirm-password.validator';
import { CustomCurrencyPipe } from '../../pipe/customCurrency.pipe';


@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss']
})
export class MyProfilComponent implements OnInit {
  showEditForm;
  form : FormGroup;

  tiersName: string;
  idEntite: any;
  idTiers: any;
  credits: string;
  creditsLimit: string;
  callCenter: string;
  trUserName: string;
  codeDevise: string;
  dueAmount: string;
  email: string;
  idUserTiers: string;
  logo:any;
  address: string;

  constructor(private fb: FormBuilder,  
      public translate: TranslateService,
      private cookie: CookieService,
      private curencyPipe: CustomCurrencyPipe,
    ) {
      this.codeDevise = this.cookie.get('codeDevise'); 
      this.email = this.cookie.get('email');   
      this.tiersName = this.cookie.get('tiersName');
      this.credits = this.curencyPipe.transform(this.cookie.get('credits'));
      this.creditsLimit = this.cookie.get('creditsLimit');
      this.callCenter = this.cookie.get('callCenter');
      this.trUserName = this.cookie.get('trUserName');
      this.codeDevise = this.cookie.get('codeDevise');
      this.address=this.cookie.get("address");
      this.email=this.cookie.get("email"),
      this.idEntite=this.cookie.get("idEntite");
      this.idTiers= this.cookie.get("idTiers");
      this.idUserTiers = this.cookie.get("idUserTiers"); 
   

     }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        currentPassword: ["",Validators.required],
        password: ["",Validators.required],
        confirmPassword: ["",Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }
  save(){
    console.log(this.form.value);
    
  }
}
