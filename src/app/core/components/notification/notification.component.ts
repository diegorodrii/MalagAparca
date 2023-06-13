import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input() notifications: Notification[];

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    const contentElement = document.querySelector('ion-content');
    if (contentElement) {
      contentElement.classList.add('show'); 
    }
  }
}
