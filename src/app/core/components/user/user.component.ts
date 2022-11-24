import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { User } from '../../models/user.model';
import { PeopleService } from '../../services/people.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})
export class UserComponent implements OnInit {
  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() userInput: User;

  constructor(private peopleSvc:PeopleService) { }

  ngOnInit() {}


  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.userInput);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();

    this.onDelete.emit(this.userInput);
  } 
  
}