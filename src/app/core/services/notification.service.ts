import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase-service';
import { BehaviorSubject } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { Notification } from '../models/notification.model';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject([]);
  public notifications$ = this._notificationsSubject.asObservable();

  private unsubscr;

  constructor(private firebase: FirebaseService) {
    this.unsubscr = this.firebase.subscribeToCollection('notifications', this._notificationsSubject, this.mapNotification);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapNotification(doc: DocumentData) {
    return {
      id: 0,
      docId: doc.id,
      title: doc.data().title,
      body: doc.data().body,
      date: doc.data().date
    };
  }

  getNotifications() {
    return this._notificationsSubject.value;
  }

  async addNotification(notification: Notification) {
    try {
      await this.firebase.createDocument('notifications', notification);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNotification(notification: Notification) {
    try {
      await this.firebase.deleteDocument('notifications', notification.docId);
    } catch (error) {
      console.log(error);
    }
  }
  


}
