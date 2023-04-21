import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserComponent } from './components';
import { ParkingComponent } from './components/parking/parking.component';
import { MyPlaceComponent } from './components/my-place/my-place.component';
import { environment } from 'src/environments/environment';
import { FirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from '.';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';


@NgModule({
  declarations: [
    UserComponent,
    MyPlaceComponent,
    ParkingComponent
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
    UserComponent,
    MyPlaceComponent,
    ParkingComponent
  ],
  providers: []
})
export class CoreModule { }
