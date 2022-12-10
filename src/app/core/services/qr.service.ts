import { Injectable } from '@angular/core';
import { Qr } from '../models/qr.model';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor() { }
  public _qr: Qr[] = [
    {

      id: 1,
      image:"https://randomqr.com/" 
  },
  
  ]
}
