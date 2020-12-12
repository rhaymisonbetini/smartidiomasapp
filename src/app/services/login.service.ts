import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { }

  login(data: any) {
    return this.http.post(this.urlService.url + 'login', data);
  }

}
