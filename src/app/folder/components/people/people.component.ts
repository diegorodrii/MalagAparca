import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AssignmentsService, User } from 'src/app/core';
import { UserDetailComponent } from 'src/app/core/components/user-detail/user-detail.component';
import { PeopleService } from 'src/app/core/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {

  public user: User[];
  constructor(private peopleSVC: PeopleService,
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


  getPeople() {
    return this.peopleSVC.user$;
  }

  async presentUserForm(user: User) {
    const modal = await this.modal.create({
      component: UserDetailComponent,
      componentProps: {
        user: user
      }
    });

    modal.present();

    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.peopleSVC.addUser(result.data.user);
            break;
          case 'Edit':
            this.peopleSVC.updateUser(result.data.user);
            break;
          default:
        }
      }
    });
  }
  onEditUser(user){
    this.presentUserForm(user);
  }
  async onDeleteAlert(user){
    const alert = await this.alert.create({
      header:'Atención',
      message: '¿Está seguro de que desear borrar a la persona?',
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
            this.peopleSVC.deleteUserById(user.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onUserExistsAlert(park){
    const alert = await this.alert.create({
      header: 'Error',
      message: 'No es posible borrar la persona porque está asignada a una tarea',
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

  onDeleteUser(user){
     if(!this.assignSVC.getAssignmentsByUserId(user.id).length)
     this.onDeleteAlert(user);
    else
      this.onUserExistsAlert(user);
   
    
  }
}
