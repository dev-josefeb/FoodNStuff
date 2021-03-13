import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { faStackOverflow, faGoogle, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  faStackOverflow = faStackOverflow;
  faGithub = faGithub;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faMailBulk = faMailBulk;

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login();
  }
}
