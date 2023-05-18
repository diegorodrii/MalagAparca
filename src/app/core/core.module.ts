import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DateTimeSelectableComponent, ParkSelectableComponent } from './components';
import { ParkingComponent } from './components/parking/parking.component';
import { MyPlaceComponent } from './components/my-place/my-place.component';
import { environment } from 'src/environments/environment';
import { FirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from '.';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { ProfileComponent } from './components/profile/profile.component';
import { MyPlaceDetailComponent } from './components/my-place-detail/my-place-detail.component';
import { ReportComponent } from './components/report/report.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { ParkingDetailComponent } from './components/parking-detail/parking-detail.component';


@NgModule({
  declarations: [
    MyPlaceComponent,
    ParkingComponent,
    ProfileComponent,
    MyPlaceDetailComponent,
    ReportComponent,
    ReportDetailComponent,
    DateTimeSelectableComponent,
    ParkingDetailComponent,
    ParkSelectableComponent
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
      name: '__malagaparcadb',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    
  ],
  
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MyPlaceComponent,
    ParkingComponent,
    ProfileComponent,
    MyPlaceDetailComponent,
    ReportComponent,
    ReportDetailComponent,
    DateTimeSelectableComponent,
    ParkingDetailComponent,
    ParkSelectableComponent




  ],
  providers: []
})
export class CoreModule { }
