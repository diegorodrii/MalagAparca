import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, take } from 'rxjs';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

import { Parking, Report } from '../models';
import { UserService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private _parkingsSubject:BehaviorSubject<Parking[]> = new BehaviorSubject([]);
  public parkings$ = this._parkingsSubject.asObservable();


  unsubscr;
  constructor(
    private firebase:FirebaseService,
    private userSVC: UserService

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
      tenantEmail:doc.data().tenantEmail,
      tenantPicture:doc.data().tenantPicture || '',
      startsAt:doc.data().startsAt,
      finishsAt:doc.data().finishsAt,
      state: doc.data().state,

    };
  }


  getParkings(){
    return this._parkingsSubject.value;
  }

  getParkingById(id:string){
    return new Promise<Parking>(async (resolve, reject)=>{
      try {
        const user = await this.userSVC.user$.pipe(take(1)).toPromise(); // Obtener el usuario logueado

        var response = (await this.firebase.getDocument('parkings', id));
        resolve({
          id:0,
          docId:response.id,
          placeId: response.data.placeId,
          placeOwner:user?.email,
          tenantEmail:response.data.tenantEmail,
          tenantPicture:response.data.tenantPicture,
          startsAt:response.data.startsAt,
          finishsAt:response.data.finishsAt,
          state: response.data.state,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteParkingById(parking: Parking){
    try {
      await this.firebase.deleteDocument('parkings', parking.docId);
    } catch (error) {
      console.log(error);
    }
  }

   async addParking(parking:Parking){
    var _parking = {
      id: 0,
      docId:parking.docId,
      placeId: parking.placeId,
      placeOwner:parking.placeOwner,
      tenantEmail:parking?.tenantEmail,
      startsAt:parking.startsAt,
      finishsAt:parking.finishsAt,
    };
    try {
      console.log(parking)
      await this.firebase.createDocument('parkings', _parking);  
    } catch (error) {
      console.log(error);
    }
  }

  async updateParking(parking:Parking){
    try {
      await this.firebase.updateDocument('parkings', parking.docId, parking);
    } catch (error) {
      console.log(error);
    }
    
  }
}