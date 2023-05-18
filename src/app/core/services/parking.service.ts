import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

import { Parking, Report } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private _parkingsSubject:BehaviorSubject<Parking[]> = new BehaviorSubject([]);
  public parkings$ = this._parkingsSubject.asObservable();


  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('parkings',this._parkingsSubject, this.mapParking);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapParking(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      placeId:doc.data().placeId,
      placeOwner:doc.data().placeOwner,
      placeTenant:doc.data().placeTenant,
      startsAt:doc.data().startsAt,
      finishsAt:doc.data().finishsAt,
      state: doc.data().state

    };
  }


  getParkings(){
    return this._parkingsSubject.value;
  }

  getParkingById(id:string){
    return new Promise<Parking>(async (resolve, reject)=>{
      try {
        var response = (await this.firebase.getDocument('parkings', id));
        resolve({
          id:0,
          docId:response.id,
          placeId: response.data.placeId,
          placeOwner:response.data.placeOwner,
          placeTenant:response.data.placeTenant,
          startsAt:response.data.startsAt,
          finishsAt:response.data.finishsAt,
          state: response.data.state
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getParkingsBy(field, value){
    return new Promise<Parking[]>(async (resolve, reject)=>{
      try {
        var parkings = (await this.firebase.getDocumentsBy('parkings', field, value)).map<Parking>(doc=>{
          return {
            id:0,
            docId:doc.id,
            placeOwner:doc.data.placeOwner,
            placeId: doc.data.placeId,
            placeTenant:doc.data.placeTenant,
            startsAt:doc.data.startsAt,
            finishsAt:doc.data.finishsAt,
            state: doc.data.state
      
          }
        });
        resolve(parkings);  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteParkingById(id:string){
    try {
      await this.firebase.deleteDocument('parkings', id);
    } catch (error) {
      console.log(error);
    }
  }

   async addParking(assignment:Parking){
    try {
      await this.firebase.createDocument('parkings', assignment);  
    } catch (error) {
      console.log(error);
    }
  }

  async updateParking(assignment:Parking){
    try {
      await this.firebase.updateDocument('parkings', assignment.docId, assignment);
    } catch (error) {
      console.log(error);
    }
    
  }
}
