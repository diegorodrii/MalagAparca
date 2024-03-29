import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard, UserService } from 'src/app/core/services';
import { Platform } from '@ionic/angular';
import { NotificationComponent } from 'src/app/core/components/notification/notification.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  language = 1;
  userEmail: string;
  isMobile: boolean;
  notificationsViewed: boolean;

  constructor(
    private platform: Platform,
    private translateSVC: TranslateService,
    private authSVC: AuthGuard,
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    private notificationService: NotificationService,
    private userService: UserService

  ) {
    this.translateSVC.setDefaultLang('en');
  }
  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.notificationsViewed = user.notificationsViewed;
    });
    console.log(this.notificationsViewed)
  }
  async openNotificationModal() {
    const notifications = this.notificationService.getNotifications(); // Obtener las notificaciones desde el servicio
    this.userService.markNotificationsViewed(); // Actualizar estado de notificaciones a "vistas"

    const modal = await this.modalController.create({
      component: NotificationComponent,
      componentProps: {
        notifications: notifications
      },
      cssClass: "modal-full-right-side"
    });
    await modal.present();
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
  signOut() {
    this.userService.signOut();
    this.router.navigate(['login']);
  }


}
