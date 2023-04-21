import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Park } from '../../models/park.model';
import { MyParkService, ParkingService } from '../../services';

@Component({
  selector: 'app-my-place',
  templateUrl: './my-place.component.html',
  styleUrls: ['./my-place.component.scss'],
})
export class MyPlaceComponent implements OnInit {

    list: Park[] = [];
    mylistSubject: BehaviorSubject<Park[]> = new BehaviorSubject(this.list);
    mylist$ = this.mylistSubject.asObservable();
    emptyPlace: boolean =false;

    @Input() myPlaceInput: Park

    constructor(private myPlaceSVC: MyParkService) {
      this.list = this.myPlaceSVC._parks;

      if(this.list.length ==0){
        this.mylistSubject.next(this.list);
        this.emptyPlace = true;
      }
    }

    ngOnInit() { }

 
}
