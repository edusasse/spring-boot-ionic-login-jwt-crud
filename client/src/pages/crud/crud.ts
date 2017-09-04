import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { CrudService } from '../../providers/crud-service';
import { CrudModalPage } from './crud-modal';

@Component({
  selector: 'page-crud',
  templateUrl: 'crud.html',
  providers: [CrudService]
})
export class CrudPage {
  private cruds: Array<any>;

  constructor(public crudService: CrudService,
              public modalCtrl: ModalController, 
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.crudService.getCruds().subscribe(cruds => {
      this.cruds = cruds;
    })
  }

  openModal(crudId) {
    let modal = this.modalCtrl.create(CrudModalPage, crudId);
    modal.present();
    modal.onDidDismiss(() => this.ionViewDidLoad())
  }

  remove(crud) {
    this.crudService.remove(crud.id);
    for (let i = 0; i < this.cruds.length; i++) {
      if (this.cruds[i] === crud) {
        this.cruds.splice(i, 1);
        let toast = this.toastCtrl.create({
          message: 'Crud "' + crud.name + '" deleted.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }
  }

}
