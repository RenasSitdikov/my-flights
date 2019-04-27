import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlightGalleryComponent } from './flight-gallery.component';

const flightsGalleryRoutes = [
    {path: '', component: FlightGalleryComponent},
];

@NgModule({
    imports: [RouterModule.forChild(flightsGalleryRoutes)],
    exports: [RouterModule]
})
export class FlightGalleryRoutingModule {}
