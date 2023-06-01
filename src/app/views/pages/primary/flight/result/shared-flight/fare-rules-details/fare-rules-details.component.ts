import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ResultService } from '../../result.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';

@Component({
  selector: 'app-fare-rules-details',
  templateUrl: './fare-rules-details.component.html',
  styleUrls: ['./fare-rules-details.component.scss']
})
export class FareRulesDetailsComponent implements OnInit {
  fareRulesDetails;
  loadingFareRules = true;
  descRule = '';
  selectedRow;
  constructor(public dialogRef: MatDialogRef<FareRulesDetailsComponent>,
              private resultService: ResultService,
              private toastr: ToastrService,
              private languageServise: LanguageService,
              public translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }
  showHideRule(index){
    this.data.fareRules[0].ruleDetails[index].open = !this.data.fareRules[0].ruleDetails[index].open;
   }
   format(rules){
    return rules.replace(/--/g, '<br>');
   }
}
