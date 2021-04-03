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

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log(returnUrl);
    localStorage.setItem('returnUrl', returnUrl);

    this.fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then();
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
}
