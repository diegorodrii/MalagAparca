
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Assignment } from '../models/assign.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private _assignments: Assignment[] = [
    {
      id: 1,
      idPark: 1,
      idUser: 2,
      startsAt: moment().toISOString(),
      finishsAt: moment().add(1, 'days').toISOString(),
    },
    {
      id: 2,
      idPark: 1,
      idUser: 1,
      startsAt: moment().toISOString(),
      finishsAt: moment().add(1, 'days').toISOString(),
    }
  ]
  private _assignmentsSubject: BehaviorSubject<Assignment[]> = new BehaviorSubject(this._assignments);
  public assign$ = this._assignmentsSubject.asObservable();

  id: number = this._assignments.length + 1;
  constructor() { }
  getAssignments() {
    return this._assignments;
  }
  getAssignmentById(id: number) {
    return this._assignments.find(a => a.id == id);
  }

  getAssignmentsByParkId(idPark: number): Assignment[] {
    return this._assignments.filter(a => a.idPark == idPark);
  }
  getAssignmentsByUserId(idUser: number): Assignment[] {
    return this._assignments.filter(a => a.idUser == idUser);
  }


  deleteAssignmentById(id: number) {
    this._assignments = this._assignments.filter(a => a.id != id);
    this._assignmentsSubject.next(this._assignments);
  }

  addAssignment(assingment: Assignment) {
    assingment.id = this.id++;
    this._assignments.push(assingment);
    this._assignmentsSubject.next(this._assignments);
  }

  updateAssignment(assignment: Assignment) {
    var _assignment = this._assignments.find(a => a.id == assignment.id);
    if (_assignment) {
      _assignment.idPark = assignment.idPark;
      _assignment.idUser = assignment.idUser;
      _assignment.startsAt = assignment.startsAt;
      _assignment.finishsAt = assignment.finishsAt;
    }
    this._assignmentsSubject.next(this._assignments);

  }
}
