import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  constructor(private httpClient: HttpClient) { }
  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }
  getMonths() {
    return this.httpClient.get('../../../../../../../assets/data/months.json');
  }

  getTypeVisa(idPays): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/visa/visaController/getTypeVisa/` + idPays);
  }

  getVisaInstruction(idPays, idTypeVisa): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/visa/visaController/getDocumentVisa12/` + idPays + '/' + idTypeVisa);
  }

  getPrixVisa(idPays, idTypeVisa): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/visa/visaController/prixVisa/` + idPays + '/' + idTypeVisa);
  }

  addNewVisa(refWebVisaListModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/visa/visaController/addNewVisaRequest/`, refWebVisaListModel);
  }

  uploadImage(body) {
    return this.httpClient.post('http://51.83.70.51:90/api/v4/documents/upload/', body
    );
  }
  getUrlFile(imageUrl: string) {
    return this.httpClient.get(imageUrl);
  }

}
