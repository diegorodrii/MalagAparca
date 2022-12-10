import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Park } from '../../models';

@Component({
  selector: 'app-park-detail',
  templateUrl: './park-detail.component.html',
  styleUrls: ['./park-detail.component.scss'],
})
export class ParkDetailComponent implements OnInit {

 form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('park') set park(park: Park){
    if(park){
      this.form.controls.id.setValue(park.id);
      this.form.controls.location.setValue(park.location);
      this.form.controls.vehicle.setValue(park.vehicle);
      this.form.controls.image.setValue(park.image);
      this.mode = "Edit";
    }
  }
  

  constructor(
    private fb:FormBuilder,
    private modal:ModalController
  ) { 
    this.form = this.fb.group({
      id:[null],
      location:['', [Validators.required]],
      vehicle:['',[Validators.required]],
      image:['']
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    
    this.modal.dismiss({park: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }
}
