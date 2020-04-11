import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight } from '../shared/flight.model';
import { Subscription } from 'rxjs';
// import { DataStorageService } from '../shared/data-storage-get.service';
import { FlightsService } from '../shared/flights.service';
import * as moment from 'moment';
// import { AuthService } from '../auth/auth.service';
import { StatusService } from '../shared/status.service';
import { Title } from '@angular/platform-browser';
import getSearchLink from '../shared/utils/searchLink';

@Component({
  selector: 'app-flight-gallery',
  templateUrl: './flight-gallery.component.html',
  styleUrls: ['./flight-gallery.component.sass']
})
export class FlightGalleryComponent implements OnInit, OnDestroy {

  flights: Flight[];
  subscription: Subscription;

  constructor(
    private flightsService: FlightsService,
    private statusService: StatusService,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.titleService.setTitle('My Flights - gallery');
    this.subscription = this.flightsService.flightsChanged.subscribe(
      (flights: Flight[]) => {
        this.flights = flights;
      }
    );
    this.flights = this.flightsService.getFlights();
    this.statusService.inside();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchLink(reg: string) {
    return getSearchLink(reg);
  }

  humanizeAge(age: moment.Duration) {
    return this.flightsService.humanizeAge(age);
  }

}
