import { API } from "../../config";
import { Component, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { UserService } from "../../providers/user/user-service";
import { NgModel } from "@angular/forms";
import { User } from "../../app/model/user";
import { AuthHttp} from "angular2-jwt";
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: 'user.html'
})
export class UserPage {
  user: User;
  error: any;

  constructor(private readonly userService: UserService,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private readonly  authHttp: AuthHttp,
              private navParams: NavParams) {
        this.user = navParams.get('user');
  }

  

  save(form: NgForm) {
    this.userService.save(this.user).subscribe(result => {
      let toast = this.toastCtrl.create({
        message: 'User "' + this.user.name + '" updated!',
        duration: 3000
      });
      toast.present();
    }, error => this.error = error)
  }

  ionViewDidLoad() {
  }

  handleError(error: any) {
    let message = `Unexpected error occurred`;

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
