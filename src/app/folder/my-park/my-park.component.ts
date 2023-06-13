import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MyPlaceComponent, Place, UserService } from 'src/app/core';
import { MyPlaceDetailComponent } from 'src/app/core/components/my-place-detail/my-place-detail.component';
import { MyParkService } from 'src/app/core/services/my-park.service';
import { ParkingService } from 'src/app/core/services/parking.service';

@Component({
  selector: 'app-my-park',
  templateUrl: './my-park.component.html',
  styleUrls: ['./my-park.component.scss'],
})
export class MyParkComponent implements OnInit {
  userId: string;
  userPlaces : Place[] =[]
  constructor(
    private placeSVC: MyParkService,
    private parkingsSvc: ParkingService,
    private modal: ModalController,
    private alert: AlertController,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.userService.getLoggedInUserId();
    console.log(this.userId);
    this.getPlaces().subscribe(places => {
      this.userPlaces = places.filter(place => this.isUserPlace(place));
    });
  }
  getPlaces() {
    
    return this.placeSVC.places$;

  }

  async presentPlaceForm(place: Place) {
    const modal = await this.modal.create({
      component: MyPlaceDetailComponent,
      componentProps: {
        place: place
      },
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.placeSVC.addPlace(result.data.place);
            break;
          case 'Edit':
            this.placeSVC.updatePlace(result.data.place);
            break;
          default:
        }
      }
    });
  }

  onEditPlace(place) {
    this.presentPlaceForm(place);
  }

  async onDeleteAlert(place) {

    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar la plaza?',
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
            this.placeSVC.deletePlace(place);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  async onDeletePlace(place) {

    this.onDeleteAlert(place);
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
    this.presentForm(MyPlaceDetailComponent, (data) => {
      this.placeSVC.addPlace(data.place);
    });
  }

  isUserPlace(place: Place): boolean {
    if (place.uid == this.userId) {
      return true
    } else {
      return false
    }
  }

}
