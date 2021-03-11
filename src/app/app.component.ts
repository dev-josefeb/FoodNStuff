import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideAnimation } from './animations';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideAnimation],
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
