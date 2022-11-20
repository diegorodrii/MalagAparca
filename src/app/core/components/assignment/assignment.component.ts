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
  @Input() assignment:Assignment;

  constructor( private peopleSVC:PeopleService,
    private parksSVC:ParksService,
    private assignmentsSVC:AssignmentsService) { }

  ngOnInit() {}

  getPark():Park{
    var idPark = this.assignment.idPark;
    if(idPark)
      return this.parksSVC.getParkById(idPark);
    return undefined;
  }

  getUser(): User{
    var idUser = this.assignment.idTenant;
    if(idUser)
      return this.peopleSVC.getUserById(idUser);
    return undefined;
  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.assignment);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.assignment);
  }
}
