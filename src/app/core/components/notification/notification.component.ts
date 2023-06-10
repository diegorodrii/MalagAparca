import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  constructor(private modalController: ModalController) {}

  closeModal() {
    const modalElement = document.querySelector('ion-modal');
    modalElement.classList.remove('show');
    setTimeout(() => {
      this.modalController.dismiss();
    }, 300);
  }

  ngOnInit() {}

}
