import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { AllFormsModule } from '../shared/all-forms.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StatusMessageModule } from '../shared/status-message/status-message.module';

@NgModule({
    declarations: [
        AccountComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        AllFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        StatusMessageModule
    ]
})
export class AccountModule {}
