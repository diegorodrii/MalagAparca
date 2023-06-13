import { Injectable } from '@angular/core';
import { FirebaseDocument, FirebaseService } from './firebase/firebase-service';
import { BehaviorSubject } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { Notification } from '../models/notification.model';
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject([]);
  public notifications$ = this._notificationsSubject.asObservable();

  private unsubscr;

  constructor(private firebase: FirebaseService) {
    this.unsubscr = this.firebase.subscribeToCollection('notifications', this._notificationsSubject, this.mapNotification.bind(this));
  }
  
  public async getUsersCollection(): Promise<FirebaseDocument[]> {
    const firestore = getFirestore();
    const collectionRef = collection(firestore, 'usuarios');
    const querySnapshot = await getDocs(collectionRef);
    const documents: FirebaseDocument[] = [];

    querySnapshot.forEach((doc) => {
      const document: FirebaseDocument = {
        id: doc.id,
        data: doc.data() as DocumentData
      };
      documents.push(document);
    });

    return documents;
  }

  
  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapNotification(doc: DocumentData) {
    return {
      id: 0,
      docId: doc.id,
      uid: doc.data().uid,
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
  
      // Actualizar el estado notificationsViewed de todos los usuarios
      this.firebase.getDocuments('usuarios').then((users: FirebaseDocument[]) => {
        users.forEach((user: FirebaseDocument) => {
          const userId = user.id;
          const userRef = doc(getFirestore(), 'usuarios', userId);
          const userData: DocumentData = user.data;
          const updatedData = { ...userData, notificationsViewed: false };
  
          updateDoc(userRef, updatedData);
        });
      });
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
