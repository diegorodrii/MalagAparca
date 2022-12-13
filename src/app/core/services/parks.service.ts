import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Park } from '../models/park.model';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class ParksService {
  private _parks:Park[] = [
    {
      id: 1,
      location: "C/Eolo 15",
      image: "/assets/avatar1.jpeg",
      vehicle:"Coche"
    },
    {
       
      id: 2,
      location: "C/Navarro 15",
      image: "",
      vehicle:"Camión"
      }
  ];

  private _parksSubject:BehaviorSubject<Park[]> = new BehaviorSubject(this._parks);
  public park$ = this._parksSubject.asObservable();
  id:number = this._parks.length+1;
  constructor(private shareSVC : ShareService) { }

  getParks(){
    return this._parks;
  }

  getParkById(id:number){
    return this._parks.find(p=>p.id==id);
  }

  deleteParkById(id:number){
    this._parks = this._parks.filter(p=>p.id != id); 
    this._parksSubject.next(this._parks);
  }

  addPark(park:Park){
    park.id = this.id++;
    this._parks.push(park);
    this._parksSubject.next(this._parks);
    this.shareSVC.onShareClicked();
  }

  updatePark(park:Park){
    var _park = this._parks.find(p=>p.id==park.id);
    if(_park){
      _park.location = park.location;
      _park.image = park.image;

  
    }
    this._parksSubject.next(this._parks);
    
  }
}
