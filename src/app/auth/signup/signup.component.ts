import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { StatusService } from 'src/app/shared/status.service';
import { Title } from '@angular/platform-browser';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError('notSame'));
    return (invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private statusService: StatusService,
    private titleService: Title
    ) {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      repassword: [null, [Validators.required]]
    }, { validator: this.checkPasswords });
  }


  ngOnInit() {
    this.statusService.outside();
    this.titleService.setTitle('My Flights - register');
  }
  ngOnDestroy() {
    this.statusService.clearMessages();
  }

  onSignup() {
    this.statusService.clearMessages();
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const repassword = this.signupForm.value.repassword;
    if (repassword === password) {
      console.log('Email: ' + email + '; Password: ' + password);
    }
    this.statusService.clearMessages();
    this.authService.signupUser(email, password);
    console.log(this.signupForm);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const repass = group.controls.repassword.value;
    return pass === repass ? null : { notSame: true };
}

onSigninProvider(providerName) {
  this.statusService.clearMessages();
  this.authService.signInViaProvider(providerName);
}

isAuthenticated() {
  return this.statusService.isAuthenticated();
}
isRedirecting() {
  return this.statusService.isRedirecting();
}
}
