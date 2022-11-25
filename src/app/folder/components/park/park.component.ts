import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AssignmentsService, Park, ParkDetailComponent, ParksService } from 'src/app/core';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {

  constructor(private parkSVC: ParksService,
    private fb: FormBuilder,
    private modal: ModalController,
    private alert: AlertController,
    private assignSVC: AssignmentsService) { }

  ngOnInit() { }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }


  getParks() {
    return this.parkSVC.park$;
  }
  async presentParkForm(park: Park) {
    const modal = await this.modal.create({
      component: ParkDetailComponent,
      componentProps: {
        park: park
      }
    });

    modal.present();

    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.parkSVC.addPark(result.data.park);
            break;
          case 'Edit':
            this.parkSVC.updatePark(result.data.park);
            break;
          default:
        }
      }
    });
  }
  onEditPark(park) {
    this.presentParkForm(park);
  }
  async onDeleteAlert(park) {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar esta plaza?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: () => {
            this.parkSVC.deleteParkById(park.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onParkExistsAlert(user) {
    const alert = await this.alert.create({
      header: 'Error',
      message: 'No es posible borrar la plaza porque está asignada a una persona',
      buttons: [
        {
          text: 'Cerrar',
          role: 'close',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeletePark(park) {
    if (!this.assignSVC.getAssignmentsByParkId(park.id).length)
      this.onDeleteAlert(park);
    else
      this.onParkExistsAlert(park);

  }
}