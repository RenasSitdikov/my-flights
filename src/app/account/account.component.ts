import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth/auth.service';
import { StatusService } from '../shared/status.service';
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
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit, OnDestroy {

  accountForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private statusService: StatusService,
    private titleService: Title
    ) {
    this.accountForm = this.formBuilder.group({
      name: [null, [Validators.maxLength(20)]],
      email: [null, [Validators.email]],
      password: [null, [Validators.minLength(6)]],
      repassword: [null, []]
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
    this.statusService.inside();
    this.titleService.setTitle('My Flights - account');
  }
  ngOnDestroy() {
    this.statusService.clearMessages();
  }

  getData() {
    return this.authService.getData();
  }

  onSubmit() {
    this.statusService.clearMessages();
    const name = this.accountForm.value.name;
    const email = this.accountForm.value.email;
    const password = this.accountForm.value.password;

    console.log('Email: ' + email + '; Password: ' + password);
    console.log(this.accountForm);

    this.authService.updateData(name, email, password);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const repass = group.controls.repassword.value;
    return pass === repass ? null : { notSame: true };
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  isRedirecting() {
    return this.statusService.isRedirecting();
  }

}
