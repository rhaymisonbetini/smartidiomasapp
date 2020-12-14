import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private navController: NavController) {

  }

  canActivate() {
    let token = sessionStorage.getItem('token');
    let email = sessionStorage.getItem('email');

    if (token && email) {
      return true;
    }
    this.navController.navigateRoot('/login');
  }

}
