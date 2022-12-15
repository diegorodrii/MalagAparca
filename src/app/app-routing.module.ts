import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'folder/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'park',
    loadChildren: () => import('./folder/components/park/park.component').then( m => m.ParkComponent)
  },
  {
    path: 'people',
    loadChildren: () => import('./folder/components/people/people.component').then( m => m.PeopleComponent)
  },

  {
    path: 'assign',
    loadChildren: () => import('./folder/components/assign/assign.component').then( m => m.AssignComponent)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
