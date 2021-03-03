import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user$: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.user$ = fireAuth.authState;
  }

  logout() {
    this.fireAuth.signOut();
  }
}
