import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  constructor(
    private urlService: UrlService,
    private http: HttpClient
  ) { }


  getQuestion(id: number, type: string) {
    return this.http.get(this.urlService.url + `question/${id}/${type}`);
  }

  updatePoints(data: any) {
    return this.http.post(this.urlService.url + `update-points`, data);
  }
}
