import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  saveRegisteredUser(userDetails, user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: userDetails.fullName,
      email: userDetails.email,
    });
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
