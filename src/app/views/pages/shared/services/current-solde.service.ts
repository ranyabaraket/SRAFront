import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CurrentSoldeService {

  idEntite: any;
  idTiers: any;

  currentSolde = new BehaviorSubject<string>('0');

  constructor(private httpClient: HttpClient, private cookie: CookieService) {
    this.idEntite=this.cookie.get("idEntite");
    this.idTiers= this.cookie.get("idTiers");
    console.log("idEntite now is :: ",this.idEntite);
    console.log("idTiers now is :: ", this.idTiers);
    
    
    setInterval(() => { this.getMySolde(this.idEntite, this.idTiers); }, (30 * 1000));
  }

  getMySolde = (idEntite: any, idTiers: any) => {
    this.httpClient.get(`${environment.backend_url}/reftiers/currentsolde/`+idEntite+ '/'+idTiers
      ).subscribe(res => {
        const ress = JSON.parse(JSON.stringify(res));
        if (ress.success) {
          this.setCurrentsolde(ress.currentSolde);
        }
      });
  }

  getCurrentSolde() {
    return this.currentSolde.getValue();
  }

  setCurrentsolde(solde) {
    this.currentSolde.next(solde);
  }

}
