import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public url:string = 'http://localhost:3333/'

  constructor() { }
}
