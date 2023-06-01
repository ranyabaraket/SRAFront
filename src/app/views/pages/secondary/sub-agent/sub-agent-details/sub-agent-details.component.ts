import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { SubAgentService } from '../sub-agent.service';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { RefUtilisateurTiers } from '../refUtilisateurTiers';
@Component({
  selector: 'app-sub-agent-details',
  templateUrl: './sub-agent-details.component.html',
  styleUrls: ['./sub-agent-details.component.scss']
})
export class SubAgentDetailsComponent implements OnInit {
  loading: boolean;
  idUserTiers: any;
  refUtilisateurTiers: RefUtilisateurTiers = new RefUtilisateurTiers();;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SubAgentDetailsComponent>,
    private subAgentService: SubAgentService,
    private cookie: CookieService,
    private toastr: ToastrService,
    private currencyPipe: CustomCurrencyPipe,
    private languageServise: LanguageService,
    public translate: TranslateService,) {
    this.idUserTiers = this.cookie.get("idUserTiers");

  }

  ngOnInit() {
    console.log("this.data is :: ", this.data);
    this.refUtilisateurTiers = this.data;
  }

  edit() {

    //   this.data.subAgent.idPays = Number(this.data.subAgent.idPays);
    this.data.subAgent.idPays = this.data.pays.find(
      (g) => g.lpays === this.data.subAgent.country).idPays;
    this.loading = true;
    this.subAgentService.edit(this.data.subAgent, this.idUserTiers).subscribe(
      data => {
        this.toastr.success('Success');
        this.loading = false;
        this.dialogRef.close(true);
      },
      err => {
        console.log(err);
        this.toastr.error(err);
        this.loading = false;
      }
    );
  }

  changeValue(v) {
    if (v === 'O') {
      return v = 'N';
    } else {
      return v = 'O';
    }
  }
  formatCurr(c) {
    return this.currencyPipe.transform(c);
  }

}
