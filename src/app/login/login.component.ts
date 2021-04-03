import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { faGoogle, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  faGithub = faGithub;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faMailBulk = faMailBulk;

  authGoogle = new firebase.auth.GoogleAuthProvider();
  authGitHub = new firebase.auth.GithubAuthProvider();

  constructor(private auth: AuthService) {}

  login(authprovider: firebase.auth.AuthProvider) {
    this.auth.login(authprovider);
  }
}
