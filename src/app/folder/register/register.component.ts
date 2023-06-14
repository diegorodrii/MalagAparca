import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core';
import { PasswordValidation } from 'src/app/core/utils/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private modalCtrl:ModalController,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      name:["", Validators.required],
      lastname:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
      password:["", Validators.required],
      confirmPassword:["", Validators.required]
    },{validator:[PasswordValidation.passwordMatch, PasswordValidation.passwordProto]});
  }

  ngOnInit() {}

  onRegister(){
    this.modalCtrl.dismiss({
      name:this.form.value.name,
      lastname:this.form.value.lastname,
      email:this.form.value.email,
      password:this.form.value.password,
   
    }, 'ok');
    
  }

  hasFormError(error){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  } 

}
