import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  // public url:string = 'http://localhost:3333/'
  public url:string = 'https://f73831c92e87.ngrok.io/'

  constructor() { }
}
