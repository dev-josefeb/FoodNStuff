import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = fireAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log(returnUrl);
    localStorage.setItem('returnUrl', returnUrl);

    this.fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then();
  }

  logout() {
    this.fireAuth.signOut();
  }
}
