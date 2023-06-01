import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies/cookie';
import { PagesService } from '../../pages.service';
import { SearchModel } from '../../primary/flight/searchModel';
import { HotelSearchModel } from '../../primary/hotel/hotelSearchModel';

@Component({
  selector: 'app-custom-loading',
  templateUrl: './custom-loading.component.html',
  styleUrls: ['./custom-loading.component.scss']
})
export class CustomLoadingComponent implements OnInit {
  @Input() searchModel:HotelSearchModel = null;
  @Input() roomsDetailsModel: any;
  logoEntite;
  idEntite;
  codeDevise: string;
  constructor(public translate: TranslateService,   
     private cookie: CookieService,
     private pageService:PagesService,
     private sanitizer: DomSanitizer,
    ) { 
      this.codeDevise = this.cookie.get('codeDevise');


      this.idEntite=this.cookie.get('idEntite');
      this.pageService.getLogo(this.idEntite).subscribe(data=>{
        this.logoEntite = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + data.logo);})
  
    }

  ngOnInit(): void {
    console.log(this.searchModel);
  }

}
