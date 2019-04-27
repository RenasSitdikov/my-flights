import { NgModule } from '@angular/core';
import { FlightTableComponent } from './flight-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../shared/material.module';
import { AllFormsModule } from '../shared/all-forms.module';
import { CommonModule } from '@angular/common';
import { FlightTableRoutingModule } from './flight-table-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusMessageModule } from '../shared/status-message/status-message.module';


@NgModule({
    declarations: [
        FlightTableComponent
    ],
    imports: [
        AllFormsModule,
        CommonModule,
        FlightTableRoutingModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MaterialModule,
        MatTooltipModule,
        StatusMessageModule
    ]
})
export class FlightTableModule {}
