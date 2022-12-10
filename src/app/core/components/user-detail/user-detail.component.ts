import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('user') set user(user:User){
    if(user){
      this.form.controls.id.setValue(user.id);
      this.form.controls.name.setValue(user.name);
      this.form.controls.subname.setValue(user.subname);
      this.form.controls.vehicle.setValue(user.vehicle);
      this.form.controls.image.setValue(user.image);
      this.mode = "Edit";
    }
  }
  

  constructor(
    private fb:FormBuilder,
    private modal:ModalController
    
  ) { 
    this.form = this.fb.group({
      id:[null],
      name:['', [Validators.required]],
      subname:['', [Validators.required]],
      vehicle:['',[Validators.required]],
      image:['']
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    
    this.modal.dismiss({user: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }
}
