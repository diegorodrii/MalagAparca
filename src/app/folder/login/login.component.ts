import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthGuard, UserService } from 'src/app/core';
import { RegisterComponent } from '../register/register.component';
import { PasswordValidation } from 'src/app/core/utils/password-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{

  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private modalCtrl:ModalController,
    private user:UserService,
    private router:Router
  ) { 
    this.form = this.formBuilder.group({
      identifier:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    }, { validator: PasswordValidation.passwordProto });
    
  }

  ngOnInit() {}

  async register(){
    const modal = await this.modalCtrl.create({
      component:RegisterComponent,
    });

    modal.onDidDismiss().then(async(response)=>{
      try {
        if(response.role=='ok'){
          await this.user.register(response.data);
          this.router.navigate(['home'], {replaceUrl:true});
        }
        
      } catch (error) {
        console.log(error);
  
      }
    });
    modal.present();
  }

  async onSignIn(){
    try {
      await this.user.login(this.form.value);
      this.router.navigate(['home'], {replaceUrl:true});
    } catch (error) {
      console.log(error);

    }
    
  }

  hasFormError(error: string) {
    return this.form?.errors && Object.keys(this.form.errors).filter(e => e == error).length == 1;
  }
  
  errorsToArray(errors) {
    if (errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  } 

}
