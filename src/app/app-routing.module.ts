import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: '', loadChildren: () => import('./start/start.module').then(m => m.StartModule)},
  {path: 'flights', loadChildren: () => import('./flight/flight.module').then(m => m.FlightModule)},
  {path: 'flights-table', loadChildren: () => import('./flight-table/flight-table.module').then(m => m.FlightTableModule)},
  {path: 'flights-gallery', loadChildren: () => import('./flight-gallery/flight-gallery.module').then(m => m.FlightGalleryModule)},
  {path: 'flights-manager', loadChildren: () => import('./flight-edit/flight-edit.module').then(m => m.FlightEditModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
