import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../../models/park.model';
import { MyParkService, ParkingService } from '../../services';
import { ModalController } from '@ionic/angular';
import { MyPlaceDetailComponent } from '../my-place-detail/my-place-detail.component';

@Component({
  selector: 'app-my-place',
  templateUrl: './my-place.component.html',
  styleUrls: ['./my-place.component.scss'],
})
export class MyPlaceComponent implements OnInit {
  
  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() place:Place;
  constructor() { }

  ngOnInit() {}

  onEditClick(){
    this.onEdit.emit(this.place);
  }

  onDeleteClick(){
    this.onDelete.emit(this.place);
  }
}
