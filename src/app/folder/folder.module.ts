import { NgModule } from '@angular/core';



import { FolderPage } from './folder.page';
import { CoreModule } from '../core/core.module';
import { FolderPageRoutingModule } from './folder-routing.module';
import { PeopleComponent } from './components/people/people.component';
import { AssignComponent } from './components/assign/assign.component';
import { ParkComponent } from './components/park/park.component';

@NgModule({
  imports: [
    CoreModule,
    FolderPageRoutingModule,
    
  ],
  declarations: [FolderPage,
  AssignComponent,
  ParkComponent,
  PeopleComponent,]
})
export class FolderPageModule {}
