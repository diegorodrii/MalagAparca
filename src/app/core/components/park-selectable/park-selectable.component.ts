import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Place } from '../../models';
import { MyParkService } from '../../services';


export const PARK_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ParkSelectableComponent),
  multi: true
};


@Component({
  selector: 'app-park-selectable',
  templateUrl: './park-selectable.component.html',
  styleUrls: ['./park-selectable.component.scss'],
  providers:[PARK_PROFILE_VALUE_ACCESSOR]
})
export class ParkSelectableComponent implements OnInit, ControlValueAccessor {

  selectedPark:Place=null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private parksSvc:MyParkService
  ) { }


  async writeValue(obj: any) {
    try {
      this.selectedPark = await this.parksSvc.getPlaceById(obj);
    } catch (error) {
      console.log("No se ha podido recupera los datos: "+error);
    }
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
    return this.parksSvc.getPlaces();
  } 

  onParkClicked(park:Place, accordion:IonAccordionGroup){
    this.selectedPark = park;
    accordion.value='';
    this.propagateChange(this.selectedPark.docId);
  }

}
