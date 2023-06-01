import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreMenuService {

  private primaryMenu = new BehaviorSubject<any>([]);
  public StoredPrimaryMenu = this.primaryMenu.asObservable();
  constructor() {
  }

  storePrimaryMenu(primaryMenu) {
    this.primaryMenu.next(primaryMenu);
  }
}
