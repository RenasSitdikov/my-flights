import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StatusService } from '../shared/status.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass']
})
export class StartComponent implements OnInit, OnDestroy {

  pages = {
    loggedin: [
      {text: 'Flights', link: '/flights-table', icon: 'list'},
      {text: 'Gallery', link: '/flights-gallery', icon: 'insert_photo'},
      {text: 'Add new', link: '/flights-manager/new', icon: 'add'},
      {text: 'Account', link: '/account', icon: 'account_circle'},
    ],
    loggedout: [
      {text: 'Register', link: 'auth/signup', icon: 'person_add'},
      {text: 'Log in', link: 'auth/signin', icon: 'input'}
    ]
  };

  features = [
    {name: 'add', img: '../../assets/f01.jpg', header: 'Add',
    text: 'Fill all details of your flights, aircraft info, destinations, airlines and many more'},
    {name: 'edit', img: '../../assets/f02.jpg', header: 'Edit',
    text: 'Change information, add additional details or just delete it'},
    {name: 'seeFlight', img: '../../assets/f03.jpg', header: 'Store',
    text: 'All flight details in one page, managing options and connection link to aircraft profile in spotters portals'},
    {name: 'seeTable', img: '../../assets/f04.jpg', header: 'Find',
    text: 'Look for by using specific information in the table'},
    {name: 'seeGallery', img: '../../assets/f05.jpg', header: 'See',
    text: 'Enjoy by watching all your flights in card gallery'},
    {name: 'seeStats', img: '../../assets/f06.jpg', header: 'Discover',
    text: 'Find interesting statistics of your travels (This feature will be available in future)'}
  ];

  constructor(
    private authService: AuthService,
    private statusService: StatusService,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.titleService.setTitle('My Flights - start');
  }
  ngOnDestroy() {
    this.statusService.clearMessages();
  }

  getData() {
    return this.authService.getData();
  }

  onLogout() {
    this.authService.logout();
  }
  isVerified() {
      return this.authService.isVerified();
  }
  onVerifyEmail() {
    this.statusService.clearMessages();
    this.authService.sendVerificationEmail();
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  isRedirecting() {
    return this.statusService.isRedirecting();
  }

}
