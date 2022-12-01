import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Usuarios', url: '/folder/People', icon: 'person' },
    { title: 'Plazas', url: '/folder/Park', icon: 'car' },
    { title: 'Asignamiento Plazas', url: '/folder/Assign', icon: 'git-branch' },
    { title: 'Contacto', url: '/folder/Contact', icon: 'happy' },


  ];
  public labels = [];

  constructor() {}
}
