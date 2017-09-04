import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { AuthService } from "../providers/auth/auth-service";
import { UserService } from "../providers/user/user-service";

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any = null;

  constructor(private readonly platform: Platform,
              private readonly statusBar: StatusBar,
			        private readonly splashScreen: SplashScreen,
              private readonly authService: AuthService,
              private readonly userService: UserService) {
    // only when everything is ready
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

	  // subscribe to auth-service
    this.authService.authUser.subscribe(jwt => {
	    // if the token is avaliable go to to main page, otherwise go to login page
      if (jwt) {
        this.rootPage = TabsPage;
      }
      else {
        this.rootPage = LoginPage;
      }
    });

   	// performs auth check
    this.authService.performAuthentication();
  }

  logout() {
    this.authService.logout();
  }

}
