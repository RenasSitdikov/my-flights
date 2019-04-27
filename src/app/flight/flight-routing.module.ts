import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlightComponent } from './flight.component';

const flightRoutes = [
    {path: '', redirectTo: '/flights-table', pathMatch: 'full'},
    {path: ':id', component: FlightComponent},
];

@NgModule({
    imports: [RouterModule.forChild(flightRoutes)],
    exports: [RouterModule]
})
export class FlightRoutingModule {}
