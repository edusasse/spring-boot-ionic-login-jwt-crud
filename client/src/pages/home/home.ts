import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from "../../providers/auth/auth-service";
import { UserService } from "../../providers/user/user-service";
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user$: any;

  constructor(private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly app: App,
              private readonly navCtrl: NavController) {
  }

  logout() {
    this.authService.logout();
  }

  editUser() {
    let nav = this.app.getRootNav();
    nav.push(UserPage, {
      user: this.userService.getCurrentUser()
    });
  }
   
}
