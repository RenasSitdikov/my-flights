import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../shared/flights.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Flight } from '../shared/flight.model';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { StatusService } from '../shared/status.service';
import { Title } from '@angular/platform-browser';
// import moment = require('moment');

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.sass']
})
export class FlightComponent implements OnInit, OnDestroy {

  flights: Flight[];
  subscription: Subscription;
  id: number;
  flight: Flight;
  prevFlight: Flight;
  nextFlight: Flight;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private statusService: StatusService,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.subscription = this.flightsService.flightsChanged.subscribe(
      (flights: Flight[]) => {
        this.flights = flights;
        this.update();
        // this.updateTitle();
      }
    );
    this.titleService.setTitle('My Flights');
    this.flights = this.flightsService.getFlights();
    this.statusService.inside();

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +this.route.snapshot.params['id'];
        this.update();
      }
    );

    console.log('Flight component inited!');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {
    this.flight = this.flights[this.id - 1];
    this.prevFlight = this.flights[this.id - 2];
    this.nextFlight = this.flights[this.id];
    this.updateTitle();
  }
  updateTitle() {
    if (this.flight) {
      const flight = this.flight;
      let
      airline = '',
      aircraft = '',
      date = '',
      registration = '',
      origin = '',
      destination = '';

      if (flight.airline) {
        airline = flight.airline;
      }
      if (flight.aircraft) {
        aircraft = flight.aircraft;
      }
      if (flight.date) {
        date = flight.date.format('D MMM YYYY');
      }
      if (flight.registration) {
        registration = flight.registration;
      }
      if (flight.origin) {
        origin = flight.origin;
      }
      if (flight.destination) {
        destination = flight.destination;
      }

      this.titleService.setTitle(
        date + ' ' + aircraft + ' ' + airline + ' ' + origin + ' - ' + destination + ' ' + registration);
    }
  }

  humanizeAge(age: moment.Duration) {
    return this.flightsService.humanizeAge(age);
  }

}
