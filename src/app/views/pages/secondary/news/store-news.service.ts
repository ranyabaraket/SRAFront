import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StoreNewsService {

  private news = new BehaviorSubject<any>([]);
  private StoredNews = this.news.asObservable();

  private nbUnreadnews = new BehaviorSubject<any>([]);
  private  nbUnreadStoredNews = this.news.asObservable();
  constructor(private httpClient: HttpClient) {
  }
  storeNews(news) {
    this.news.next(news);
  }
  getNews() {
    return this.StoredNews;
  }

  storenbUnreadNews(news) {
    this.nbUnreadnews.next(news);
  }
  getnbUnreadNews() {
    return this.nbUnreadStoredNews;
  }
}
