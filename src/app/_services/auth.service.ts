import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../_models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private fireAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = fireAuth.authState;
  }

  login(authprovider: firebase.auth.AuthProvider) {
    this.setReturlUrl();
    this.fireAuth.signInWithPopup(authprovider).then();
  }

  logout() {
    this.fireAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      })
    );
  }

  loginWithEmail(value) {
    this.setReturlUrl();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.loginEmail, value.loginPassword)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  doRegisterWithEmail(value) {
    this.setReturlUrl();

    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            const user = firebase.auth().currentUser;
            resolve(res);
            return user.updateProfile({
              displayName: value.fullName,
            });
          },
          (err) => reject(err)
        );
    });
  }

  private setReturlUrl() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }
}
