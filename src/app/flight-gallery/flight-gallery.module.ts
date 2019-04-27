import { NgModule } from '@angular/core';
import { FlightGalleryComponent } from './flight-gallery.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlightGalleryRoutingModule } from './flight-gallery-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusMessageModule } from '../shared/status-message/status-message.module';


@NgModule({
    declarations: [
        FlightGalleryComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        FlightGalleryRoutingModule,
        MatTooltipModule,
        StatusMessageModule
    ]
})
export class FlightGalleryModule {}
