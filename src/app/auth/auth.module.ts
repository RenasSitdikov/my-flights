import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { AllFormsModule } from '../shared/all-forms.module';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StatusMessageModule } from '../shared/status-message/status-message.module';


@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AllFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        StatusMessageModule,
    ]
})
export class AuthModule {}