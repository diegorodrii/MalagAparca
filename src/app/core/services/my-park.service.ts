import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, map, take } from 'rxjs';
import { Place } from '../models/park.model';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { DocumentData } from 'firebase/firestore';
import { Platform, ToastController } from '@ionic/angular';
import { UserService } from './user.service';
import { ParkingService } from './parking.service';

@Injectable({
  providedIn: 'root'
})
export class MyParkService {

  private _placesSubject: BehaviorSubject<Place[]> = new BehaviorSubject([]);
  public places$ = this._placesSubject.asObservable();

  unsubscr;
  constructor(
    private platform: Platform,
    private firebase: FirebaseService,
    private userSVC: UserService,
    private toastController: ToastController,
    private parkingService: ParkingService,


  ) {
    this.unsubscr = this.firebase.subscribeToCollection('plazas', this._placesSubject, this.mapPlace);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapPlace(doc: DocumentData) {
    return {
      id: 0,
      docId: doc.id,
      uid: doc.data().uid,
      number: doc.data().number,
      ownerEmail: doc.data().ownerEmail,
      ownerPicture: doc.data().ownerPicture
    };
  }

  getPlaces() {
    return this._placesSubject.value;
  }

  getPlaceById(id: string): Promise<Place> {
    return new Promise<Place>(async (resolve, reject) => {
      try {
        var place = (await this.firebase.getDocument('plazas', id));
        resolve({
          id: 0,
          docId: place.id,
          uid: place.data.uid,
          number: place.data.number,
          ownerEmail: place.data.ownerEmail,
          ownerPicture: place.data.ownerPicture
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  async deletePlace(place: Place) {
    const isPlaceInUse = this.isPlaceInUse(place);

    if (isPlaceInUse) {
      const toast = await this.toastController.create({
        message: 'El lugar está siendo utilizado en un parking y no se puede borrar.',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
      return;
    }

    await this.firebase.deleteDocument('plazas', place.docId);
  }



  isPlaceInUse(place: Place): boolean {
    const parkings = this.parkingService.getParkings();
    return parkings.some(parking => parking.placeId === place.docId);
  }

  async deletePlacesByEmail(email: string) {
    const places = this._placesSubject.value.filter(place => place.ownerEmail === email);
    for (const place of places) {
      await this.deletePlace(place);
    }
  }
  async addPlace(place: Place) {
    const user = await this.userSVC.user$.pipe(take(1)).toPromise(); // Obtener el usuario logueado
    // Verificar si ya existe un lugar con el mismo número
    const existingPlace = this._placesSubject.value.find(p => p.number === place.number);
    if (existingPlace) {
      throw new Error('Ya existe un lugar con el mismo número.');
    }
    var _place = {
      id: 0,
      uid: user?.uid,
      docId: place.docId,
      number: place.number,
      ownerEmail: user?.email,
      ownerPicture: user?.picture
    };
    if (place['pictureFile']) {
      var response = await this.uploadImage(place['pictureFile']);
      _place['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('plazas', _place);
    } catch (error) {
      console.log(error);
    }
    console.log(_place)
  }


  uploadImage(file): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.firebase.imageUpload(file);
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async updatePlace(place: Place) {
    var _place = {
      id: 0,
      docId: place.docId,
      number: place.number,
    };
    if (place['pictureFile']) {
      var response: FileUploaded = await this.uploadImage(place['pictureFile']);
      _place['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('plazas', _place.docId, _place);
    } catch (error) {
      console.log(error);
    }
  }

  async writeToFile() {
    var dataToText = JSON.stringify(this._placesSubject.value);
    var data = new Blob([dataToText], { type: 'text/plain' });
    this.firebase.fileUpload(data, 'text/plain', 'places', '.txt');
  }

  getOwnerPictureById(id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const place = await this.getPlaceById(id);
        resolve(place.ownerPicture);
      } catch (error) {
        reject(error);
      }
    });
  }
}
