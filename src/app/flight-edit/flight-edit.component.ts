import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';
import { FlightsService } from '../shared/flights.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Flight } from '../shared/flight.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { StatusService } from '../shared/status.service';
import { Title } from '@angular/platform-browser';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.sass'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FlightEditComponent implements OnInit, OnDestroy {

  tgDest = {origin: '', destination: '', forigin: '', fdestination: ''};
  flights: Flight[];
  subscription: Subscription;
  authed: boolean;
  id: number;
  editMode = false;
  copyMode = false;
  flightForm: FormGroup;
  ffStartDate = moment([1992]);

  constructor(
    private flightsService: FlightsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private statusService: StatusService,
    private titleService: Title
    ) {}

  ngOnInit() {
    this.statusService.inside();
    this.titleService.setTitle('My Flights');

    this.subscription = this.flightsService.flightsChanged.subscribe(
      (flights: Flight[]) => {
        this.flights = flights;
        this.initForm();
      }
    );

    this.getFlights();

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.detectMode(params);
          this.initForm();
        }
      );
      console.log('Flight Edit component inited!');
      console.log(this.flightForm);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.statusService.clearMessages();
    this.statusService.stopSpin();
  }

  getFlights() {
    if (this.isAuthenticated) {
      this.flights = this.flightsService.getFlights();
    }
  }

  detectMode(params: Params) {
    console.log(params);
    if (params['id'] != null && params['mode'] === 'edit') {
      this.editMode = true;
      this.copyMode = false;
      this.titleService.setTitle('My Flights - edit');
    } else if (params['id'] != null && params['mode'] === 'copy') {
      this.editMode = true;
      this.copyMode = true;
      this.titleService.setTitle('My Flights - copy');
    } else if (!params['id']) {
      this.editMode = false;
      this.copyMode = false;
      this.titleService.setTitle('My Flights - add');
      console.log('NEEEEEW!');
    } else {
      console.log('WRONG!');
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.statusService.spin();
    const age = this.countAge(this.flightForm.value.date, this.flightForm.value.ff);
    this.flightForm.value.age = age;

    if (this.editMode && !this.copyMode) {
      this.flightsService.updateFlight(
        this.id,
        this.flightForm.value,
        this.authService.getToken(),
        this.authService.getUID()
        );
    } else {
      this.flightForm.value.n = 0;
      this.flightsService.addFlight(
        this.flightForm.value,
        this.id,
        this.authService.getToken(),
        this.authService.getUID()
        );
    }
  }
  onDelete() {
    this.flightsService.deleteFlight(
      this.id,
      this.authService.getToken(),
      this.authService.getUID()
      );
  }
  onCancel() {
    if (!this.editMode) {
      this.router.navigate(['/flights-table']);
    } else {
      this.router.navigate(['/flights/' + this.id]);
    }
  }

  countAge(date: moment.Moment, ff: moment.Moment) {
    if (date && ff) {
      return moment.duration(date.diff(ff));
    }
    return undefined;
  }

  onClearInput(name, required = false) {
    if (required) {
      this.flightForm.setControl(name, new FormControl('', Validators.required));
    } else {
      this.flightForm.setControl(name, new FormControl(''));
    }
  }

  onToogleDestinations() {
    this.tgDest.origin = this.flightForm.value.destination;
    this.tgDest.destination = this.flightForm.value.origin;
    this.tgDest.forigin = this.flightForm.value.fdestination;
    this.tgDest.fdestination = this.flightForm.value.forigin;
    this.flightForm.setControl('origin', new FormControl(this.tgDest.origin));
    this.flightForm.setControl('destination', new FormControl(this.tgDest.destination));
    this.flightForm.setControl('forigin', new FormControl(this.tgDest.forigin, Validators.required));
    this.flightForm.setControl('fdestination', new FormControl(this.tgDest.fdestination, Validators.required));
  }

  private initForm() {
    let flightDate: moment.Moment;
    let flightAirline = '';
    let flightAltairline = '';
    let flightAircraft = '';
    let flightRegistration = '';
    let flightFlight = '';
    let flightAltflight = '';
    let flightOrigin = '';
    let flightForigin = '';
    let flightDestination = '';
    let flightFdestination = '';
    let flightSeat = '';
    let flightPhoto = '';
    let flightLink = '';
    let flightName = '';
    let flightMsn = '';
    let flightFf: moment.Moment;

    if (this.editMode && this.isAuthenticated()) {
      const flight = this.flightsService.getFlight(this.id);

      flightDate = flight.date;
      flightAirline = flight.airline;
      flightAltairline = flight.altairline;
      flightAircraft = flight.aircraft;
      flightRegistration = flight.registration;
      flightFlight = flight.flight;
      flightAltflight = flight.altflight;
      flightOrigin = flight.origin;
      flightForigin = flight.forigin;
      flightDestination = flight.destination;
      flightFdestination = flight.fdestination;
      flightSeat = flight.seat;
      flightPhoto = flight.photo;
      flightLink = flight.link;
      flightName = flight.name;
      flightMsn = flight.msn;
      flightFf = flight.ff;

    }

    this.flightForm = new FormGroup({
      'date': new FormControl(flightDate, Validators.required),
      'airline': new FormControl(flightAirline, Validators.required),
      'altairline': new FormControl(flightAltairline),
      'aircraft': new FormControl(flightAircraft, Validators.required),
      'registration': new FormControl(flightRegistration),
      'flight': new FormControl(flightFlight),
      'altflight': new FormControl(flightAltflight),
      'origin': new FormControl(flightOrigin),
      'forigin': new FormControl(flightForigin, Validators.required),
      'destination': new FormControl(flightDestination),
      'fdestination': new FormControl(flightFdestination, Validators.required),
      'seat': new FormControl(flightSeat),
      'photo': new FormControl(flightPhoto),
      'link': new FormControl(flightLink),
      'name': new FormControl(flightName),
      'msn': new FormControl(flightMsn),
      'ff': new FormControl(flightFf)
    });
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
