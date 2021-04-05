import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { faGoogle, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isSignup = false;
  user = { username: '', email: '', password: '', confirmPassword: '' };
  userLogin = { email: '', password: '' };

  faGithub = faGithub;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faMailBulk = faMailBulk;

  authGoogle = new firebase.auth.GoogleAuthProvider();
  authGitHub = new firebase.auth.GithubAuthProvider();

  constructor(private auth: AuthService, private toastr: ToastrService) {}

  login(authprovider: firebase.auth.AuthProvider) {
    this.auth.login(authprovider);
  }

  loginWithEmail(value) {
    this.auth.loginWithEmail(value).then(
      (res) => {},
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  registerUser(value: any) {
    this.auth.doRegisterWithEmail(value).then(
      (res) => {
        console.log(res);
        this.toastr.success('Your account has been created');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }
}
