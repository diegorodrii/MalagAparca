import { Injectable } from '@angular/core';
import { BehaviorSubject, empty } from 'rxjs';
import { Park } from '../models/park.model';

@Injectable({
  providedIn: 'root'
})
export class MyParkService {

  emptyPlace: boolean = false;

   _parks: Park[] = [
    {
      id: 1,
      image: "/assets/garaje1.jpg",
      location: "C/Eolo 15",
      price: "2€",
      asignado: true
    },
    {
      id: 2,
      image: "/assets/garaje1.jpg",
      location: "C/Eolo 15",
      price: "2€",
      asignado: false
    },
  ]
  private _parksSubject: BehaviorSubject<Park[]> = new BehaviorSubject(this._parks);
  public park$ = this._parksSubject.asObservable();
  id: number = this._parks.length + 1;

  constructor() { }

  getParks() {
    return this._parks;
  }

  getParkById(id: number) {
    return this._parks.find(p => p.id == id);
  }

  noPark(emptyPark: boolean) {
    if (this._parks.length == 0) {
      emptyPark == true;
    } else {
      emptyPark == false;
    }
  }

  deleteParkById(id: number) {
    this._parks = this._parks.filter(p => p.id != id);
    this._parksSubject.next(this._parks);
  }

  addPark(park: Park) {
    park.id = this.id++;
    this._parks.push(park);
    this._parksSubject.next(this._parks);
  }

  updatePark(park: Park) {
    var _park = this._parks.find(p => p.id == park.id);
    if (_park) {
      _park.location = park.location;
      _park.image = park.image;


    }
    this._parksSubject.next(this._parks);

  }
}
