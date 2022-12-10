import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
  language = 1;
  constructor(private translateSVC: TranslateService,
    ) {
    this.translateSVC.setDefaultLang('en');
  }

  onTranslate(){
    this.language = (this.language+1)%2;
    switch(this.language){
      case 0:
        this.translateSVC.setDefaultLang('es');
        break;
      case 1:
        this.translateSVC.setDefaultLang('en');
        break;
    }
  }

}
