import { API } from "../../config";
import { CrudService } from '../../providers/crud-service';
import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController, ToastController, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './crud-modal.html'
})
export class CrudModalPage {
  public CRUD_API;
  @ViewChild('name') name;
  crud: any = {};
  error: any;

  constructor(public crudService: CrudService,
              public params: NavParams,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public navCtrl: NavController) {
    this.CRUD_API = API + '/cruds';   
    if (this.params.data.id) {
      this.crudService.get(this.params.get('id')).subscribe(crud => {
        this.crud = crud;
        this.crud.href = this.CRUD_API + '/' + this.params.data.id;
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(form: NgForm) {
    let update: boolean = form['href'];
    this.crudService.save(form).subscribe(result => {
      let toast = this.toastCtrl.create({
        message: 'Crud "' + form.name + '" ' + ((update) ? 'updated' : 'added') + '.',
        duration: 3000
      });
      toast.present();
      this.dismiss();
    }, error => this.error = error)
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.name.setFocus();
    },150);
  }
}
