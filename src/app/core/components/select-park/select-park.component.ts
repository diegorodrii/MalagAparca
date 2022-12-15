import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Park } from '../../models/park.model';
import { ParksService } from '../../services';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectParkComponent),
  multi: true
};

@Component({
  selector: 'app-select-park',
  templateUrl: './select-park.component.html',
  styleUrls: ['./select-park.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class SelectParkComponent implements OnInit, ControlValueAccessor{

  selectedPark:Park=null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private parkSVC:ParksService
  ) { }


  writeValue(obj: any): void {
    this.selectedPark= this.parkSVC.getParkById(obj);
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

  getParks(){
    return this.parkSVC.getParks();
  } 

  onParkClicked(park:Park, accordion:IonAccordionGroup){
    this.selectedPark = park;
    accordion.value='';
    this.propagateChange(this.selectedPark.id);
  }

}
