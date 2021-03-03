import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: firebase.User;

  constructor(private fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe((user) => (this.user = user));
  }

  logout() {
    this.fireAuth.signOut();
  }
}
