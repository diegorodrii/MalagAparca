import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

import { Report } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _reportsSubject:BehaviorSubject<Report[]> = new BehaviorSubject([]);
  public reports$ = this._reportsSubject.asObservable();

  unsubscr;
  constructor(
    private platform:Platform,
    private firebase:FirebaseService,
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('denuncias',this._reportsSubject, this.mapReport);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapReport(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      uid: doc.uid,
      title:doc.data().title,
      description:doc.data().description,
      date:doc.data().date,
      picture:doc.data().picture
    };
  }

  getReports(){
    return this._reportsSubject.value;
  }

  getReportById(id:string):Promise<Report>{
    return new Promise<Report>(async (resolve, reject)=>{
      try {
        var report = (await this.firebase.getDocument('denuncias', id));
        resolve({
          id:0,
          docId:report.id,
          title:report.data.title,
          description:report.data.description,
          date:report.data.date,
          picture:report.data.picture
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteReport(report:Report){
    await this.firebase.deleteDocument('denuncias', report.docId);
  }

  async addReport(report:Report){
    var _report = {
      id:0,
      docId:report.docId,
      title:report.title,
      description:report.description,
      date:report.date,

    };
    if(report['pictureFile']){
      var response = await this.uploadImage(report['pictureFile']);
      _report['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('denuncias', _report);  
    } catch (error) {
      console.log(error);
    }
  }

  uploadImage(file):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async updateReport(report:Report){
    var _report = {
      id:0,
      docId:report.docId,
      title:report.title,
      description:report.description,
      report:report.date
    };
    if(report['pictureFile']){
      var response:FileUploaded = await this.uploadImage(report['pictureFile']);
      _report['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('denuncias', _report.docId, _report);  
    } catch (error) {
      console.log(error);
    }
  }

  async writeToFile(){
    var dataToText = JSON.stringify(this._reportsSubject.value);
    var data = new Blob([dataToText], {type: 'text/plain'});
    this.firebase.fileUpload(data, 'text/plain', 'reports', '.txt');
  }
}