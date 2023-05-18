import { NgModule } from '@angular/core';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { CoreModule } from '../core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from '../core/utils/translate';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HomePage } from './home/home.page';
import { MyParkComponent } from './my-park/my-park.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReportsComponent } from './reports/reports.component';
import { ParkListComponent } from './park-list/park-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CoreModule,
    FolderPageRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      }
    })
  ],
  declarations: [FolderPage, HomePage, ParkListComponent, MyParkComponent, MyProfileComponent, ReportsComponent, LoginComponent, RegisterComponent]
})
export class FolderPageModule {}
