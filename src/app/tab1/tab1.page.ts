import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public name: string;
  public avatar: string;
  public level: number;
  public score: number;

  constructor() { }

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
    this.avatar = sessionStorage.getItem('avatar');
    this.level = parseInt(sessionStorage.getItem('level'));
    this.score = parseInt(sessionStorage.getItem('score'));

    setTimeout(() => {
      document.getElementById('main').classList.add('remove-opacity')
    },600)

    setTimeout(() => {
      document.getElementById('main2').classList.add('remove-opacity')
    }, 1200)

  }

}
