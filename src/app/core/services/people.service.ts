import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  public _people: User[] = [
    {
      id: 1,
      name: 'Diego',
      subname: 'Aguilera',
      image: 'https://drive.google.com/uc?export=view&id=1BHdTeQoWC1MsI_UlT0Z_Hb0mNyNpdYf5',
      vehicle: 'Coche'
    },
    {
      id: 2,
      name: 'Alberto',
      subname: 'Parra',
      image: 'https://drive.google.com/uc?export=view&id=1p_7irDllBxDp-PGoUWPnpEKudQNewZPL',
      vehicle: 'Ciclomotor'
    },
    {
      id: 3,
      name: 'Gabriela',
      subname: 'Jaramillo',
      image: 'https://drive.google.com/uc?export=view&id=12EdF_gRoVzOBdbOiYU7SuwsCkGhud8He',
      vehicle: 'Camión'
    },
  ]
private userSubject: BehaviorSubject<User[]> = new BehaviorSubject(this._people);
  public user$ = this.userSubject.asObservable();
  id: number = this._people.length + 1;

  constructor() { }


  public getPeople(): User[] {
    return this._people;
  }

  public getUserById(id: number) {
    return this._people.find(p => p.id == id);
  }

  addUser(user: User) {
    user.id = this.id++;
    this._people.push(user);
  }

  updateUser(user: User) {
    var _user = this._people.find(p => p.id == user.id);
    if (_user) {
      _user.name = user.name;
      _user.subname = user.subname;
      _user.image = user.image;
      _user.vehicle = user.vehicle;
    }
  }

  deleteUserById(id: number) {
    this._people = this._people.filter(p => p.id != id);
    this.userSubject.next(this._people);
  }
}
