import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Park } from '../../models';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit {
  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() parkInput: Park;
  constructor(
  ) { }

  ngOnInit() {}
  
  onEditClick(){
 
    this.onEdit.emit(this.parkInput);
  }

  onDeleteClick(){
    this.onDelete.emit(this.parkInput);
  } 

  
  
}
