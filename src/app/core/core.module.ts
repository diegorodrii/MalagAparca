import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserComponent } from './components/user/user.component';
import { AssignmentComponent, AssignmentDetailComponent,  ParkDetailComponent, ParkingComponent, UserDetailComponent } from './components';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent,
    ParkDetailComponent,
    AssignmentDetailComponent,
    ParkingComponent,
    AssignmentComponent,
    



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

  ]
})

export class CoreModule { }
