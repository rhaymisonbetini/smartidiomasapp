import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { }

  raking() {
    return this.http.get(this.urlService.url + 'ranking');
  }
}
