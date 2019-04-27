import { NgModule } from '@angular/core';
import { FlightEditComponent } from './flight-edit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AllFormsModule } from '../shared/all-forms.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlightEditRoutingModule } from './flight-edit-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusMessageModule } from '../shared/status-message/status-message.module';

@NgModule({
    declarations: [
        FlightEditComponent
    ],
    imports: [
        CommonModule,
        FlightEditRoutingModule,
        AllFormsModule,
        MatIconModule,
        MatButtonModule,
        MatNativeDateModule,
        MatInputModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatTooltipModule,
        StatusMessageModule
    ]
})
export class FlightEditModule {}
