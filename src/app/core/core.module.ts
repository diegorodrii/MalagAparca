import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserComponent } from './components/user/user.component';
import { AssignmentComponent, AssignmentDetailComponent,  ParkDetailComponent, ParkingComponent, UserDetailComponent } from './components';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import { HttpClient } from '@angular/common/http';
import { SelectParkComponent } from './components/select-park/select-park.component';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { SelectDatetimeComponent } from './components/select-datetime/select-datetime.component';
import { SelectFinishDatetimeComponent } from './components/select-finish-datetime/select-finish-datetime.component';



@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent,
    ParkDetailComponent,
    AssignmentDetailComponent,
    ParkingComponent,
    AssignmentComponent,
    SelectParkComponent,
    SelectUserComponent,
    SelectDatetimeComponent,
    SelectFinishDatetimeComponent,
    




  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],

  exports: [
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
    SelectParkComponent,
    SelectUserComponent,
    SelectDatetimeComponent,
    SelectFinishDatetimeComponent,

    


  ]
})

export class CoreModule { }
