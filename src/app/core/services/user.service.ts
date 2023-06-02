import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models';
import { FirebaseService } from './firebase/firebase-service';

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


  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.init();
  }

  private async init() {
    this.firebase.isLogged$.subscribe(async (logged) => {
      if (logged) {
        this._user.next((await this.firebase.getDocument('usuarios', this.firebase.getUser().uid)).data as User);
        this._uid.next(this.firebase.getUser().uid);
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
    this.router.navigate(['login']);
  }

  register(data: UserRegister) {
    return new Promise<string>(async (resolve, reject) => {
      if (!this._isLogged.value) {
        try {
          var _user: UserCredential = (await this.firebase.createUserWithEmailAndPassword(data.email, data.password));
          await this.firebase.createDocumentWithId('usuarios',
            {
              uid: _user.user.uid,
              picture: "https://ionicframework.com/docs/img/demos/avatar.svg",
              email: data.email,
              provider: 'firebase',
              token: await _user.user.getIdToken(),
              name: data.name,
              lastname: data.lastname,
            }, _user.user.uid);
          await this.firebase.connectUserWithEmailAndPassword(data.email, data.password);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('already connected');
      }
    });
  }
  getLoggedInUserId(): string {
    return this._uid.value;
  }
  
 
  
}