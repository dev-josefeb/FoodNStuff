import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { faGoogle, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import firebase from 'firebase';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isSignup = false;
  user = { fullName: '', email: '', password: '', confirmPassword: '' };
  userLogin = { email: '', password: '' };
  registerForm: FormGroup;

  faGithub = faGithub;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faMailBulk = faMailBulk;

  authGoogle = new firebase.auth.GoogleAuthProvider();
  authGitHub = new firebase.auth.GithubAuthProvider();

  constructor(private auth: AuthService, private toastr: ToastrService, private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

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
        this.auth.user$.subscribe((user) => this.userService.saveRegisteredUser(value, user));
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.message);
      }
    );
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });

    this.registerForm.controls.password.valueChanges?.subscribe(() => this.registerForm.controls.confirmPassword.updateValueAndValidity());
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    };
  }
}
