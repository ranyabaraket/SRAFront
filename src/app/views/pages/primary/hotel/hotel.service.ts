import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotels: any[];
  searchHotelsResult: Subject<any[]> = new Subject<any[]>();
  private step = new BehaviorSubject<any>([]);
  private StoredStep = this.step.asObservable();



  constructor(private httpClient: HttpClient) {
    this.searchHotelsResult.subscribe( (value ) => {
      this.hotels = value;
      console.log("hereeee +++ "+ this.hotels);
    });
  }

  addHotelToResult(value: any[]){
    this.hotels.push(value);
    this.searchHotelsResult.next(this.hotels);
  }

  getPays(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/pays/`);
  }

  getDestination(str): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/hotelstest/city/destinationsByString/` + str);
  }

  getHotels(searchModel): Observable<any> {
    // searchTwo
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/search/` , searchModel);
  }

  getHotelsTwo(searchModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/search/` , searchModel);
  }

  getHotelsRooms(roomsDetailsModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/getDetailHotel/` , roomsDetailsModel);
  }

  getSelectRoom(checkRateConditionRequestModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/selectRoom/` , checkRateConditionRequestModel);
  }

  confirmRoomReservation(bookRequestModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/book/` , bookRequestModel);
  }

  generateInvoice(comfirmationHotelModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/generateInvoice/` , comfirmationHotelModel);
  }

  cancelHotelBooking(comfirmationHotelModel): Observable<any> {
    return this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/cancelInvoice/` , comfirmationHotelModel);
  }

  async loadMore(page){
    return await this.httpClient.get(`${environment.backend_url}/hotelstest/HotelSearch/loadMore/${page}`
    ).toPromise();
  }

  async sortHotels(sortBy){
    // console.log('filterHotel',filter);
    return await this.httpClient.get(`${environment.backend_url}/hotelstest/HotelSearch/sort/${sortBy}`,sortBy
    ).toPromise();
  }


  async filterRoom(filterRoom){
    // console.log('filterRoom',filterRoom);
    return await this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/filterRooms`,filterRoom
    ).toPromise();
  }
  async postFilter(filter){
    // console.log('filterHotel',filter);
    return await this.httpClient.post(`${environment.backend_url}/hotelstest/HotelSearch/filterHotels`,filter
    ).toPromise();
  }



  changeStep(step) {
    this.step.next(step);
  }

  getSteps() {
    return this.StoredStep;
  }

  getLatestSearch(): Observable<any> {
    return this.httpClient.get(`${environment.backend_url}/hotelstest/HotelSearch/lastSearch `);

  }


}
