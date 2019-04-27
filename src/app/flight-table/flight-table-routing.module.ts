import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlightTableComponent } from './flight-table.component';

const flightsRoutes = [
    {path: '', component: FlightTableComponent},
];

@NgModule({
    imports: [RouterModule.forChild(flightsRoutes)],
    exports: [RouterModule]
})
export class FlightTableRoutingModule {}
