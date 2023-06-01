import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private lang = new BehaviorSubject<any>('en');
  public shareLang = this.lang.asObservable();
  constructor() {
  }

  changeLanguage(lang) {
    this.lang.next(lang);
  }
}
