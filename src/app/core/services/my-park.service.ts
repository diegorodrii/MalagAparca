import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, map, take } from 'rxjs';
import { Place } from '../models/park.model';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { DocumentData } from 'firebase/firestore';
import { Platform } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MyParkService {

  private _placesSubject:BehaviorSubject<Place[]> = new BehaviorSubject([]);
  public places$ = this._placesSubject.asObservable();

  unsubscr;
  constructor(
    private platform:Platform,
    private firebase:FirebaseService,
    private userSVC: UserService

  ) {
    this.unsubscr = this.firebase.subscribeToCollection('plazas',this._placesSubject, this.mapPlace);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapPlace(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      uid: doc.data().uid,
      number:doc.data().number,
      empty:doc.data().empty,
      published:doc.data().published,
      ownerEmail:doc.data().ownerEmail,
      ownerPicture:doc.data().ownerPicture
    };
  }

  getPlaces(){
    return this._placesSubject.value;
  }

  getPlaceById(id:string):Promise<Place>{
    return new Promise<Place>(async (resolve, reject)=>{
      try {
        const user = await this.userSVC.user$.pipe(take(1)).toPromise(); // Obtener el usuario logueado
       

        var place = (await this.firebase.getDocument('plazas', id));
        resolve({
          id:0,
          uid: user?.uid,
          docId:place.id,
          number:place.data.number,
          empty:place.data.empty,
          published:place.data.published,
          ownerEmail:user?.email,
          ownerPicture: user?.picture
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deletePlace(place:Place){
    await this.firebase.deleteDocument('plazas', place.docId);
  }

  async addPlace(place:Place){
    const user = await this.userSVC.user$.pipe(take(1)).toPromise(); // Obtener el usuario logueado
    var _place = {
      id:0,
      uid:user?.uid,
      docId:place.docId,
      number:place.number,
      empty:place.empty,
      published:place.published,
      ownerEmail:user?.email,
      ownerPicture: user?.picture
    };
    if(place['pictureFile']){
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

  async updatePlace(place:Place){
    var _place = {
      id:0,
      docId:place.docId,
      number:place.number,
      empty:place.empty,
      published:place.published
    };
    if(place['pictureFile']){
      var response:FileUploaded = await this.uploadImage(place['pictureFile']);
      _place['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('plazas', _place.docId, _place);  
    } catch (error) {
      console.log(error);
    }
  }

  async writeToFile(){
    var dataToText = JSON.stringify(this._placesSubject.value);
    var data = new Blob([dataToText], {type: 'text/plain'});
    this.firebase.fileUpload(data, 'text/plain', 'places', '.txt');
  }


}
