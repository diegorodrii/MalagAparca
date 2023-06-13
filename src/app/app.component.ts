import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  language = 1;
  constructor(private translateSVC: TranslateService, private router: Router,  ) {
    this.translateSVC.setDefaultLang('en');
    this.router.navigate(['/']);

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
