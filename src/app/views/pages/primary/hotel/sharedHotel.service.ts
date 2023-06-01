import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedHotelService {

    searchModel: any = [];

    private message = new BehaviorSubject(this.searchModel);
    sharedMessage = this.message.asObservable();

    constructor() {}

    nextMessage(searchModel) {
        this.message.next(searchModel);
    }

}
