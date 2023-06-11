import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Report, ReportDetailComponent, ReportService } from 'src/app/core';
import { ParkingService } from 'src/app/core/services/parking.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  reports$ = this.reportsSVC.getReports();

  constructor(
    private alert:AlertController,
    private modal:ModalController,
    private reportsSVC:ReportService,
    private parkingsSVC:ParkingService
  ) { }

  ngOnInit() {}
  getReports(){
    return this.reportsSVC.reports$;
  }

  async presentReportForm(report:Report){
    const modal = await this.modal.create({
      component:ReportDetailComponent,
      componentProps:{
        report:report
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.reportsSVC.addReport(result.data.report);
            break;
          case 'Edit':
            this.reportsSVC.updateReport(result.data.report);
            break;
          default:
        }
      }
    });
  }

  onEditReport(report){
    this.presentReportForm(report);
  }

  async onDeleteAlert(report){

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
            this.reportsSVC.deleteReport(report);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  
  async onDeleteReport(report){
    
      this.onDeleteAlert(report);
  }

  async onExport(){
    this.reportsSVC.writeToFile();
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
    this.presentForm(ReportDetailComponent, (data)=>{
      this.reportsSVC.addReport(data.report);
    });
  }
}
