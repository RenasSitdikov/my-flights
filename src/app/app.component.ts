
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { StatusService } from './shared/status.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  pages = {
    loggedin: [
      {text: 'Flights', link: 'flights-table', icon: 'list'},
      {text: 'Gallery', link: 'flights-gallery', icon: 'insert_photo'},
      {text: 'Add new', link: 'flights-manager/new', icon: 'add'},
      {text: 'Account', link: 'account', icon: 'account_circle'},
    ],
    loggedout: [
      {text: 'Register', link: 'auth/signup', icon: 'person_add'},
      {text: 'Log in', link: 'auth/signin', icon: 'input'}
    ]
  };

  constructor(
    private authService: AuthService,
    private statusService: StatusService,
    private titleService: Title
    ) {}

  ngOnInit() {
    this.titleService.setTitle('My Flights');
    console.log('App component inited!');
    this.authService.initAuthentication();
  }

  onLogout() {
    this.authService.logout();
  }

  showSpinner() {
    return this.statusService.showSpinner();
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
