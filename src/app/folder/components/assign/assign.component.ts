import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Assignment, AssignmentDetailComponent, AssignmentsService, ParksService } from 'src/app/core';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss'],
})
export class AssignComponent implements OnInit {

  constructor(private parkSVC: ParksService,
    private fb: FormBuilder,
    private modal: ModalController,
    private alert: AlertController,
    private assignmentSVC: AssignmentsService) { }

  ngOnInit() { }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }


  getAssignments() {
    return this.assignmentSVC.assign$;
  }
  async presentAssignForm(assignment: Assignment) {
    const modal = await this.modal.create({
      component: AssignmentDetailComponent,
      componentProps: {
        assignment: assignment
      }
    });

    modal.present();

    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.assignmentSVC.addAssignment(result.data.assignment);
            break;
          case 'Edit':
            this.assignmentSVC.updateAssignment(result.data.assignment);
            break;
          default:
        }
      }
    });
  }
  onEditAssignment(assignment) {
    this.presentAssignForm(assignment);
  }
  async onDeleteAlert(assignment) {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar esta asignación?',
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
            this.assignmentSVC.deleteAssignmentById(assignment.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  onDeleteAssignment(assignment) {
      this.onDeleteAlert(assignment);

  }
}
