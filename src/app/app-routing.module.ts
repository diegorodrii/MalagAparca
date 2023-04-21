import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './folder/login/login.component';
import { MyParkComponent } from './folder/my-park/my-park.component';
import { MyProfileComponent } from './folder/my-profile/my-profile.component';
import { ParkListComponent } from './folder/park-list/park-list.component';
import { RegisterComponent } from './folder/register/register.component';
import { ReportComponent } from './folder/report/report.component';
import { AuthGuard } from './core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./folder/home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'parkList', component: ParkListComponent
  },
  {
    path: 'myPark', component: MyParkComponent
  },
  {
    path: 'report', component: ReportComponent
  },
  {
    path: 'myProfile', component: MyProfileComponent
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'login',
    loadChildren: () => import('./folder/login/login.component').then( m => m.LoginComponent),
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate:[AuthGuard]

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
