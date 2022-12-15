import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { User } from '../../models/user.model';
import { PeopleService } from '../../services';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectUserComponent),
  multi: true
};


@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class SelectUserComponent implements OnInit {

  selectedUser:User = null
  propagateChange = (_:any) => { }
  isDisabled:boolean = false;

  constructor(
    private userSVC: PeopleService
  ) { }

  writeValue(obj: any): void {
    this.selectedUser = this.userSVC.getUserById(obj);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getPeople(){
    return this.userSVC.getPeople();
  } 

  onUserClicked(user:User, accordion:IonAccordionGroup){
    this.selectedUser = user;
    accordion.value='';
    this.propagateChange(this.selectedUser.id);
  }
  
}
