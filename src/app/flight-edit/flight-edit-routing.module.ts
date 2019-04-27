import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlightEditComponent } from './flight-edit.component';

const flightEditRoutes = [
    {path: '', redirectTo: '/flights-table', pathMatch: 'full'},
    {path: 'new', component: FlightEditComponent},
    {path: ':id/:mode', component: FlightEditComponent}
];

@NgModule({
    imports: [RouterModule.forChild(flightEditRoutes)],
    exports: [RouterModule]
})
export class FlightEditRoutingModule {}
