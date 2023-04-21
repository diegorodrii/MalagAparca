import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard, UserService } from 'src/app/core/services';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  language = 1;
  userEmail: string;
  isMobile: boolean;

  constructor(    public user:UserService,    private platform: Platform,private translateSVC: TranslateService, private authSVC: AuthGuard, private router: Router, private navCtrl: NavController

  ) {
    this.translateSVC.setDefaultLang('en');
  }
  ngOnInit(){
    
  }


  onTranslate() {
    this.language = (this.language + 1) % 2;
    switch (this.language) {
      case 0:
        this.translateSVC.setDefaultLang('es');
        break;
      case 1:
        this.translateSVC.setDefaultLang('en');
        break;
    }
  }
  signOut(){
    this.user.signOut();
    this.router.navigate(['login']);
  }


}
