import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Parking, ParkingService } from 'src/app/core';
import { ParkingDetailComponent } from 'src/app/core/components/parking-detail/parking-detail.component';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.scss'],
})
export class ParkListComponent implements OnInit {

  constructor(
    private alert:AlertController,
    private modal:ModalController,
    private parkingsSVC:ParkingService,
  ) { }

  ngOnInit() {}
  getParkings(){
    return this.parkingsSVC.parkings$;
  }

  async presentParkingForm(parking:Parking){
    const modal = await this.modal.create({
      component:ParkingDetailComponent,
      componentProps:{
        parking:parking
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
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

  onEditParking(parking){
    this.presentParkingForm(parking);
  }

  async onDeleteAlert(parking){

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

  
  async onDeleteParking(parking){
    
      this.onDeleteAlert(parking);
  }


  async presentForm(_class, onDismiss:(any)=>void){
    const modal = await this.modal.create({
      component:_class,
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result.data);
      }
    });
  }

  onNewItem(){
    this.presentForm(ParkingDetailComponent, (data)=>{
      this.parkingsSVC.addParking(data.parking);
    });
  }

  
}
