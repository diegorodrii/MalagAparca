import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-my-profile-detail',
  templateUrl: './my-profile-detail.component.html',
  styleUrls: ['./my-profile-detail.component.scss'],
})
export class MyProfileDetailComponent implements OnInit {
  images: string[] = [];

  user: User;
  editedUser: User;

  constructor(
    private modalController: ModalController,
    private storageService: StorageService
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
  uploadImage($event:any){
    this.storageService.uploadImage($event)
  }

}
