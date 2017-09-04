import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { AuthService } from "../../providers/auth/auth-service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private readonly navCtrl: NavController,
              private readonly loadingCtrl: LoadingController,
              private readonly authService: AuthService,
              private readonly toastCtrl: ToastController) {
  }

  login(value: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Acessando...'
    });

    loading.present();

    this.authService
      .login(value)
      .finally(() => loading.dismiss())
      .subscribe(
        () => {},
        err => this.handleError(err));
  }
  
  signup() {
    this.navCtrl.push(SignupPage);
  }

  handleError(error: any) {
    let message: string;
	
    if (error.status && error.status === 401) {
      message = 'Login failed!';
    }
    else {
      message = `An unexpected error occured, please check. Error message: ${error.statusText}`;
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'center'
    });

    toast.present();
  }

}
