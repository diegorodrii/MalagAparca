import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { take } from 'rxjs';
import { MyParkService, ParkingService, ReportService } from 'src/app/core';
import { MyProfileDetailComponent } from 'src/app/core/components/my-profile-detail/my-profile-detail.component';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  user: User;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private userService: UserService,
    private myParkService : MyParkService,
    private reportService: ReportService,
    private parkingService: ParkingService
  ) { }
  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: MyProfileDetailComponent,
      componentProps: {
        user: this.user
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    
    if (data) {
      // Actualizar el usuario con los nuevos datos
      this.userService.editUser(data);
    }
  }

  async deleteProfile() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar tu perfil?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            // Eliminar el perfil del usuario
            await this.myParkService.deletePlacesByEmail(this.user.email); // Elimina las plazas asociadas al usuario
            await this.reportService.deleteReportsByEmail((await this.userService.user$.pipe(take(1)).toPromise()).email);
            await this.parkingService.deleteParkingsByOwnerEmail((await this.userService.user$.pipe(take(1)).toPromise()).email);

            this.userService.deleteUser();
          }
        }
      ]
    });

    await alert.present();
  }
} 