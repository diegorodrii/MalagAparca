import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-profile-detail',
  templateUrl: './my-profile-detail.component.html',
  styleUrls: ['./my-profile-detail.component.scss'],
})
export class MyProfileDetailComponent implements OnInit {

  user: User;
  editedUser: User;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.editedUser = { ...this.user };
  }

  saveChanges() {
    this.modalController.dismiss(this.editedUser);
  }

  close() {
    this.modalController.dismiss();
  }

}
