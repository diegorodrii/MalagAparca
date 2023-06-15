import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { take } from 'rxjs';
import { Parking, ParkingService, UserService } from 'src/app/core';
import { ParkingDetailComponent } from 'src/app/core/components/parking-detail/parking-detail.component';
import { JsonGenerationService } from 'src/app/core/services/jsonGeneration.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.scss'],
})
export class ParkListComponent implements OnInit {

  isMobile : boolean;
  constructor(
    private alert: AlertController,
    private modal: ModalController,
    private parkingsSVC: ParkingService,
    private userService: UserService,
    private jsonService: JsonGenerationService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');

  }
  getParkings() {
    return this.parkingsSVC.parkings$;
  }

  async presentParkingForm(parking: Parking) {
    const modal = await this.modal.create({
      component: ParkingDetailComponent,
      componentProps: {
        parking: parking
      },
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.parkingsSVC.addParking(result.data.parking);
            break;
          case 'Edit':
            this.parkingsSVC.updateParking(result.data.parking);
            break;
          default:
        }
      }
    });
  }

  onEditParking(parking) {
    this.presentParkingForm(parking);
  }

  async onHireAlert(parking) {
    const user = await this.userService.user$.pipe(take(1)).toPromise();
    if (user.email === parking.tenantEmail) {
      console.log("Ya tienes asignada esta plaza");
      return;
    }

    const alert = await this.alert.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres asignarte esta plaza?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operación cancelada");
          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            parking.tenantEmail = user.email;
            parking.tenantPicture = user.picture;
            parking.state = 'occupied'; // campo 'state'
            this.parkingsSVC.updateParking(parking).then(() => {
              console.log("Plaza asignada correctamente");
            }).catch(error => {
              console.error("Error al actualizar la plaza en Firebase:", error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async onDeleteAlert(parking) {

    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar la tarea?',
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
            this.parkingsSVC.deleteParkingById(parking);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  async onDeleteParking(parking) {

    this.onDeleteAlert(parking);
  }

  async onHireParking(parking) {
    this.onHireAlert(parking);
  }

  async presentForm(_class, onDismiss: (any) => void) {
    const modal = await this.modal.create({
      component: _class,
      cssClass: "modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        onDismiss(result.data);
      }
    });
  }

  onNewItem() {
    this.presentForm(ParkingDetailComponent, (data) => {
      this.parkingsSVC.addParking(data.parking);
    });
  }
  downloadJson() {
    this.getParkings().subscribe(reports => {
      this.jsonService.generateJSON(reports, 'parkings');
    });
  }

}
