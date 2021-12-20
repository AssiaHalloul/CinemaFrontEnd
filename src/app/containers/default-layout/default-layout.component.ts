import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { navItems } from '../../_nav';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public loggedIn: boolean;
  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public sidebarMinimized = false;
  public navItems = navItems;

  ngOnInit() {
    console.log(this.currentUser);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
    this.loggedIn = false;

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
