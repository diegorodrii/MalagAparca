import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Assignment, Park, User } from '../../models';
import { AssignmentsService, ParksService, PeopleService } from '../../services';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
})
export class AssignmentComponent implements OnInit {
  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() assignmentInput:Assignment;

  constructor( private userSVC:PeopleService,
    private parksSVC:ParksService,
    private assignmentsSVC:AssignmentsService) { }

  ngOnInit() {}

  getPark():Park{
    var idPark = this.assignmentInput.idPark;
    if(idPark)
      return this.parksSVC.getParkById(idPark);
    return undefined;
  }

  getUser(): User{
    var idUser = this.assignmentInput.idUser;
    if(idUser)
      return this.userSVC.getUserById(idUser);
    return undefined;
  }

  onEditClick(){
    this.onEdit.emit(this.assignmentInput);
  }

  onDeleteClick(){
    this.onDelete.emit(this.assignmentInput);
  }

  getUserSVC(id:number){
    return this.userSVC.getUserById(id);
  }

  getParkService(id:number){
    return this.parksSVC.getParkById(id);
  }
}
