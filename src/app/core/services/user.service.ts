import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models';
import { FirebaseService } from './firebase/firebase-service';
import { AlertController } from '@ionic/angular';
import { deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { NotificationService } from './notification.service';
import {Notification} from './../models/notification.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();
  private _user = new BehaviorSubject<User>(null);
  public user$ = this._user.asObservable();
  private _uid = new BehaviorSubject<string>(null);
  public uid$ = this._uid.asObservable();
  private _userId: string; 

  public getUserId(): string {
    return this._userId;
  }

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private alertController: AlertController,
    private notificationService: NotificationService,
  ) {
    this.init();
  }
  public get user(): User {
    return this._user.value;
  }
  private async init() {
    this.firebase.isLogged$.subscribe(async (logged) => {
      if (logged) {
        const user = (await this.firebase.getDocument('usuarios', this.firebase.getUser().uid)).data as User;
        this._user.next(user);
        this._uid.next(this.firebase.getUser().uid);
        this._userId = this.firebase.getUser().uid; // Asignar el ID del usuario a la variable

        this.router.navigate(['home']);
      }
      this._isLogged.next(logged);
    });
  }

  public login(credentials: UserLogin): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      if (!this._isLogged.value) {
        try {
          await this.firebase.connectUserWithEmailAndPassword(credentials.identifier, credentials.password);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('already connected');
      }
    });
  }

  signOut() {
    this.firebase.signOut();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }

  getLoggedInUserId(): string {
    return this._uid.value;
  }

  editUser(user: User) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.firebase.updateDocument('usuarios', this._uid.value, user);
        this._user.next(user);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public async register(data: UserRegister) {
    if (!this._isLogged.value) {
      try {
        const user: UserCredential = await this.firebase.createUserWithEmailAndPassword(data.email, data.password);
        await this.firebase.createDocumentWithId('usuarios',
          {
            uid: user.user.uid,
            picture: "C:\\fakepath\\avatar.PNG",
            email: data.email,
            provider: 'firebase',
            token: await user.user.getIdToken(),
            name: data.name,
            lastname: data.lastname,
            notificationsViewed: false, // Inicializar el estado de las notificaciones en "false"
          }, user.user.uid);

        await this.firebase.connectUserWithEmailAndPassword(data.email, data.password);

        // Enviar notificación a todos los usuarios
        const notification: Notification = {
          id: 0,
          uid: user.user.uid,
          title: 'Nuevo registro',
          body: `¡Tu vecino/a ${data.name} ${data.lastname} se ha registrado en la aplicación!`,
          date: new Date().toISOString()
        };
        this.notificationService.addNotification(notification);

        return 'success';
      } catch (error) {
        throw error;
      }
    } else {
      throw 'already connected';
    }
  }

  deleteUser() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.router.navigateByUrl('/login');
        const currentUser = this.firebase.getUser();
        await currentUser.delete();
        // Eliminar el documento del usuario de la base de datos
        await this.firebase.deleteDocument('usuarios', this._uid.value);

        window.location.reload();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  markNotificationsViewed() {
    const user = this._user.value;
    user.notificationsViewed = true;
    this.editUser(user);
  }

}
