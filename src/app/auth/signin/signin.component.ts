import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StatusService } from 'src/app/shared/status.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit, OnDestroy {

  signinForm: FormGroup;
  resetForm: FormControl;

  constructor(
    private authService: AuthService,
    private statusService: StatusService,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.initForm();
    this.statusService.outside();
    this.titleService.setTitle('My Flights - log in');
  }
  ngOnDestroy() {
    this.statusService.clearMessages();
  }

  onSignin() {
    this.statusService.clearMessages();
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    console.log('Email: ' + email + '; Password: ' + password);
    this.statusService.clearMessages();
    this.authService.signinUser(email, password);
  }

  onSigninProvider(providerName) {
    this.statusService.clearMessages();
    this.authService.signInViaProvider(providerName);
  }
  resetPassword() {
    this.statusService.clearMessages();
    const email = this.resetForm.value;
    console.log(email);
    this.authService.resetPassword(email);
  }

  private initForm() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
    this.resetForm = new FormControl(null, [Validators.required, Validators.email]);
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  isRedirecting() {
    return this.statusService.isRedirecting();
  }
}
