import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DateTimeSelectableComponent, NotificationComponent, ParkSelectableComponent } from './components';
import { ParkingComponent } from './components/parking/parking.component';
import { MyPlaceComponent } from './components/my-place/my-place.component';
import { environment } from 'src/environments/environment';
import { FirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from '.';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { MyPlaceDetailComponent } from './components/my-place-detail/my-place-detail.component';
import { ReportComponent } from './components/report/report.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { ParkingDetailComponent } from './components/parking-detail/parking-detail.component';
import { MyProfileDetailComponent } from './components/my-profile-detail/my-profile-detail.component';
import { SpecialDatetimeComponent } from './components/special-datetime/special-datetime.component';


@NgModule({
  declarations: [
    MyPlaceComponent,
    ParkingComponent,
    MyPlaceDetailComponent,
    ReportComponent,
    ReportDetailComponent,
    DateTimeSelectableComponent,
    ParkingDetailComponent,
    ParkSelectableComponent,
    MyProfileDetailComponent,
    NotificationComponent,
    SpecialDatetimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    FirestoreModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
    }),
    
  ],
  
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MyPlaceComponent,
    ParkingComponent,
    MyPlaceDetailComponent,
    ReportComponent,
    ReportDetailComponent,
    DateTimeSelectableComponent,
    ParkingDetailComponent,
    ParkSelectableComponent,
    MyProfileDetailComponent,
    NotificationComponent,
    SpecialDatetimeComponent







  ],
  providers: []
})
export class CoreModule { }
