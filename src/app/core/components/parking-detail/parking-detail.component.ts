import { Component, Input, OnInit } from '@angular/core';
import { MyParkService } from '../../services/my-park.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ParkingService } from '../../services/parking.service';
import { Parking } from '../../models';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.scss'],
})
export class ParkingDetailComponent implements OnInit {

 
  form:FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('parking') set parking(parking:Parking){
    if(parking){
      this.form.controls.id.setValue(parking.id);
      this.form.controls.placeId.setValue(parking.placeId);
      this.form.controls.placeOwner.setValue(parking.placeOwner);
      this.form.controls.placeTenant.setValue(parking.placeTenant);
      this.form.controls.startsAt.setValue(parking.startsAt);
      this.form.controls.finishsAt.setValue(parking.finishsAt);
      this.form.controls.state.setValue(parking.state);
      this.mode = "Edit";
    }
  }
  

  
  constructor(
    private placeSVC:MyParkService,
    private parkingsSVC:ParkingService,
    private fb:FormBuilder,
    private modal:ModalController,
    private translate:TranslateService
  ) { 
    this.form = this.fb.group({
      id:[0],
      placeId:[-1, [Validators.min(1)]],

      startsAt:[null, [Validators.required]],
      finishsAt:[null, [Validators.required]],
    });
  }

  async ngOnInit() {

  }

  onSubmit(){
    
    this.modal.dismiss({parking: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

  onChangeDateTime(dateTime){
    this.form.controls.dateTime.setValue(dateTime);
  }

  onDateTime(){
    
  }

}
