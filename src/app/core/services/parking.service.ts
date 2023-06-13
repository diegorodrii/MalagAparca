import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, take } from 'rxjs';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

import { Parking, Report } from '../models';
import { UserService } from '..';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from './notification.service';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private _parkingsSubject: BehaviorSubject<Parking[]> = new BehaviorSubject([]);
  public parkings$ = this._parkingsSubject.asObservable();

  unsubscr;
  constructor(
    private firebase: FirebaseService,
    private userSVC: UserService,
    private translateService: TranslateService,
    private notificationService: NotificationService

  ) {
    this.unsubscr = this.firebase.subscribeToCollection('parkings', this._parkingsSubject, this.mapParking);
    this.checkAndDeleteExpiredParkings(); // Llamar a la función para verificar y eliminar los parkings caducados
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapParking(doc: DocumentData) {
    return {
      id: 0,
      docId: doc.id,
      placeId: doc.data().placeId,
      placeOwner: doc.data().placeOwner,
      tenantEmail: doc.data().tenantEmail,
      tenantPicture: doc.data().tenantPicture || '',
      startsAt: doc.data().startsAt,
      finishsAt: doc.data().finishsAt,
      state: doc.data().state,
    };
  }

  getParkings() {
    return this._parkingsSubject.value;
  }

  getParkingById(id: string) {
    return new Promise<Parking>(async (resolve, reject) => {
      try {
        const user = await this.userSVC.user$.pipe(take(1)).toPromise(); // Obtener el usuario logueado

        var response = (await this.firebase.getDocument('parkings', id));
        resolve({
          id: 0,
          docId: response.id,
          placeId: response.data.placeId,
          placeOwner: user?.email,
          tenantEmail: response.data.tenantEmail,
          tenantPicture: response.data.tenantPicture,
          startsAt: response.data.startsAt,
          finishsAt: response.data.finishsAt,
          state: response.data.state,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteParkingById(parking: Parking) {
    try {
      await this.firebase.deleteDocument('parkings', parking.docId);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteParkingsByOwnerEmail(ownerEmail: string) {
    const parkings = this.getParkings();
    const parkingsToDelete = parkings.filter(parking => parking.placeOwner === ownerEmail);
    for (const parking of parkingsToDelete) {
      await this.deleteParkingById(parking);
    }
  }
  async addParking(parking: Parking) {
    var _parking = {
      id: 0,
      docId: parking.docId,
      placeId: parking.placeId,
      placeOwner: parking.placeOwner,
      tenantEmail: parking?.tenantEmail,
      startsAt: parking.startsAt,
      finishsAt: parking.finishsAt,
      state: this.getParkingState()
    };
  
    try {
      await this.firebase.createDocument('parkings', _parking);
  
      // Crear la notificación con los detalles del parking
      const notification: Notification = {
        id: 0,
        uid: parking.docId,
        title: 'Nuevo parking',
        body: `${parking.placeOwner} ha agregado un nuevo parking que empieza a las ${parking.startsAt} y acaba a las ${parking.finishsAt}`,
        date: new Date().toISOString()
      };
  
      // Agregar la notificación
      this.notificationService.addNotification(notification);
    } catch (error) {
      console.log(error);
    }
  }
  

  async updateParking(parking: Parking) {
    try {
      await this.firebase.updateDocument('parkings', parking.docId, parking);
    } catch (error) {
      console.log(error);
    }
  }

  private checkAndDeleteExpiredParkings() {
    setInterval(() => {
      const currentTimestamp = new Date().getTime();
  
      const parkings = this.getParkings();
      parkings.forEach((parking) => {
        const finishsAtTimestamp = Date.parse(parking.finishsAt);
        if (currentTimestamp >= finishsAtTimestamp) {
          this.deleteParkingById(parking);
        }
      });
    }, 60000); // Verificar cada minuto (ajusta el intervalo según tus necesidades)
  }
  getParkingState(): string {
    const currentLang = this.translateService.currentLang;
    return currentLang === 'es' ? 'libre' : 'free';
  }
}
