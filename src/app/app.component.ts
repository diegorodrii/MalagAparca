import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Usuarios', url: '/folder/People', icon: 'mail' },
    { title: 'Plazas', url: '/folder/Park', icon: 'paper-plane' },
    { title: 'Asignamiento Plazas', url: '/folder/Assign', icon: 'heart' },
   

  ];
  public labels = [];

  constructor() {}
}
