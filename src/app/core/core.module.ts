import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserComponent } from './components/user/user.component';
import { AssignmentComponent, AssignmentDetailComponent, GooglemapsComponent, ParkDetailComponent, ParkingComponent, UserDetailComponent } from './components';



@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent,
    ParkDetailComponent,
    AssignmentDetailComponent,
    ParkingComponent,
    AssignmentComponent,
    GooglemapsComponent,

    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
  ],

  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserComponent,
    UserDetailComponent,
    ParkDetailComponent,
    AssignmentDetailComponent,
    ParkingComponent,
    AssignmentComponent,
    GooglemapsComponent,
    
  ]
})

export class CoreModule { }
