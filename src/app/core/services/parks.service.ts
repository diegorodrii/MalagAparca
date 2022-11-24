import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Park } from '../models/park.model';

@Injectable({
  providedIn: 'root'
})
export class ParksService {
  private _parks:Park[] = [
    {
      id: 1,
      location: "C/Eolo 15",
      image: "",
      type:""
    },
    {
       
      id: 2,
      location: "C/Eolo 15",
      image: "",
      type:""
      }
  ];

  private _parksSubject:BehaviorSubject<Park[]> = new BehaviorSubject(this._parks);
  public park$ = this._parksSubject.asObservable();
  id:number = this._parks.length+1;
  constructor() { }

  getParks(){
    return this._parks;
  }

  getParkById(id:number){
    return this._parks.find(t=>t.id==id);
  }

  deleteParkById(id:number){
    this._parks = this._parks.filter(t=>t.id != id); 
    this._parksSubject.next(this._parks);
  }

  addPark(park:Park){
    park.id = this.id++;
    this._parks.push(park);
    this._parksSubject.next(this._parks);
  }

  updatePark(park:Park){
    var _park = this._parks.find(t=>t.id==park.id);
    if(_park){
      _park.location = park.location;
      _park.image = park.image;

  
    }
    this._parksSubject.next(this._parks);
    
  }
}
