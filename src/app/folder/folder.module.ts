import { NgModule } from '@angular/core';



import { FolderPage } from './folder.page';
import { CoreModule } from '../core/core.module';
import { FolderPageRoutingModule } from './folder-routing.module';
import { PeopleComponent } from './components/people/people.component';
import { AssignComponent } from './components/assign/assign.component';
import { ParkComponent } from './components/park/park.component';
import { HomePage } from './components/home/home.page';
import { ContactComponent } from './components/contact/contact.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/utils/translate';

@NgModule({
  imports: [
    CoreModule,
    FolderPageRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
    
  ],
  declarations: [FolderPage,
  AssignComponent,
  ParkComponent,
  PeopleComponent,
  HomePage,
  ContactComponent,
]
})
export class FolderPageModule {}
