import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      const token = localStorage.getItem("incidente_token");
      const user = localStorage.getItem("email");

      if (token && user) {

        this.statusBar.backgroundColorByHexString('#5260ff');
        this.statusBar.styleLightContent();
        this.splashScreen.hide();
        this.navController.navigateRoot('')

      } else {
        this.statusBar.backgroundColorByHexString('#5260ff');
        this.statusBar.styleLightContent();
        this.splashScreen.hide();
        this.navController.navigateRoot('/login')
      }

      // this.statusBar.styleLightContent();
      // this.splashScreen.hide();

    });
  }
}
