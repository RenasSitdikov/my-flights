import { NgModule } from '@angular/core';
import { FlightComponent } from './flight.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlightRoutingModule } from './flight-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusMessageModule } from '../shared/status-message/status-message.module';

@NgModule({
    declarations: [
        FlightComponent
    ],
    imports: [
        CommonModule,
        FlightRoutingModule,
        MatIconModule,
        MatTooltipModule,
        StatusMessageModule
    ]
})
export class FlightModule {}
