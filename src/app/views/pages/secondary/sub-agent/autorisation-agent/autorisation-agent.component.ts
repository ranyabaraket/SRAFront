import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { DefaultGlobalConfig, ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { AutorisationAgentService } from '../autorisation-agent.service';
import { SubAgentService } from '../sub-agent.service';
import { AutorisationDto } from './AutorisationDto';

export interface TableElement {
  moduleName: any;
  dtCreate;
  dtModif: any;
  actifTruser:any;
}
@Component({
  selector: 'app-autorisation-agent',
  templateUrl: './autorisation-agent.component.html',
  styleUrls: ['./autorisation-agent.component.scss']
})
export class AutorisationAgentComponent implements OnInit {

  autorisationDto: AutorisationDto=new AutorisationDto();
  modules ;
  isActive = false;
  source=[];
  loading= false;
  idTiers;
  idEntite;
  refUser;
  displayedColumns = ["moduleName","dtCreate","dtModif","isActive"];
  ELEMENT_DATA: TableElement[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AutorisationAgentComponent>,
  public translate: TranslateService,
  private toastr: ToastrService,
  private subAgentService: SubAgentService,
  private autorisationAgentService: AutorisationAgentService,
  private cookie:CookieService

) {
  console.log(data);
 
}

  ngOnInit(): void {
    this.idEntite=this.cookie.get("idEntite");
    this.idTiers=this.cookie.get("idTiers");
    this.refUser=this.cookie.get("trUserName")
  this.autorisationAgentService.getModuleB2B().subscribe(data=>{
    this.modules=data;
  })


  this.autorisationAgentService.getbyIdUserTiers(this.data.id.idEntite,this.idTiers, this.data.id.idUsertiers).subscribe(data=>{
    this.source=data;
    console.log(this.data);
    
  })
  }
  applyFilter(){
    if(this.isActive){
      this.autorisationDto.isActive='O';
    }else{
      this.autorisationDto.isActive='N';

    }
  }

  save() {
    if(this.isActive){
      this.autorisationDto.isActive='O';
    }else{
      this.autorisationDto.isActive='N';

    }
  
    this.autorisationDto.idUserTiers=this.data.id.idUsertiers;
    console.log(this.autorisationDto);


    this.loading =true;
    this.autorisationAgentService.saveAutorisation(this.autorisationDto,this.idEntite,this.idTiers,this.refUser).subscribe(
      data => {
      if(data){
        this.toastr.success(this.translate.instant('Success'));
        this.loading =false;
        // this.dialogRef.close(true)
      }

      },
      error => {
        this.toastr.error(this.translate.instant(error));
        this.loading =false;
        // this.dialogRef.close()

      }
    );
  }
  close(){
    this.dialogRef.close()
  }
  onChangeModule (event) {
  }
  reset(){
    
  }
}
