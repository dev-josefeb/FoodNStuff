import { useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'foodNstuff';

  constructor(userService: UserService, auth: AuthService, router: Router) {
    auth.user$.subscribe((user) => {
      if (!user) return;
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');

      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
