import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: '', loadChildren: './start/start.module#StartModule'},
  {path: 'flights', loadChildren: './flight/flight.module#FlightModule'},
  {path: 'flights-table', loadChildren: './flight-table/flight-table.module#FlightTableModule'},
  {path: 'flights-gallery', loadChildren: './flight-gallery/flight-gallery.module#FlightGalleryModule'},
  {path: 'flights-manager', loadChildren: './flight-edit/flight-edit.module#FlightEditModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'account', loadChildren: './account/account.module#AccountModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
