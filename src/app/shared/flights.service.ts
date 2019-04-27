import { Flight } from './flight.model';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Subject } from 'rxjs';
import { StatusService } from './status.service';
import { DataStorageServiceStore } from './data-storage-store.service';
import { Router } from '@angular/router';

@Injectable()

export class FlightsService {

    flightsChanged = new Subject<Flight[]>();

    public flights: Flight[] = [];
    public flightsCopy: Flight[] = [];
    currentId: number;

    constructor(
        private statusService: StatusService,
        private dataStorageServiceStore: DataStorageServiceStore,
        private router: Router
    ) {}

    setFlights(flights: Flight[]) {
        this.flights = flights;
        this.flightsChanged.next(this.flights.slice());
    }

    getFlights() {
        return this.flights.slice();
    }

    getFlight(id) {
        if (id > 0 && id <= this.flights.length) {
            return this.flights[id - 1];
        }
    }

    addFlight(flight: Flight, id: number, tk, uid) {
        this.currentId = id;
        console.log(flight);
        let data: Flight[];
        data = this.flights.slice();
        data.push(flight);
        this.normalizeN(data);
        this.onSaveData(data, 'new', tk, uid);
    }

    updateFlight(id: number, flight: Flight, tk, uid) {
        this.currentId = id;
        const index = id - 1;
        console.log(flight);
        let data: Flight[];
        data = this.flights.slice();
        data[index] = flight;
        this.normalizeN(data);
        this.onSaveData(data, 'edit', tk, uid);
    }

    deleteFlight(id: number, tk, uid) {
        this.currentId = id;
        const index = id - 1;
        let data: Flight[];
        data = this.flights.slice();
        data.splice(index, 1);
        this.normalizeN(data);
        this.onSaveData(data, 'delete', tk, uid);
    }

    onSaveData(data: Flight[], mode = '', tk, uid) {
        this.statusService.clearMessages();
        this.dataStorageServiceStore.storeFlights(data, tk, uid)
        .subscribe(
            (response: any) => {
                console.log('response in edit');
                console.log(response);
                this.statusService.stopSpin();
                this.refreshFlights(data, mode);
            },
            (error: any) => {
                console.log('error in edit');
                console.log(error);
                this.statusService.stopSpin();
                this.statusService.setErrorMessage('Something is going wrong, please check internet connection or try later');
            }
        );
    }

    navigate(mode: string) {
        if (mode === 'delete') {
          this.router.navigate(['/flights-table']);
        } else if (mode === 'edit') {
          this.router.navigate(['/flights/' + this.currentId]);
        } else if (mode === 'new') {
          this.router.navigate(['/flights/' + this.getLength()]);
        }
    }

    refreshFlights(data: Flight[], mode = '') {
        this.flights = data.slice();
        this.flightsChanged.next(this.flights.slice());
        this.navigate(mode);
    }

    dismissFlights() {
        this.flights = [];
        console.log(this.flights);
        this.flightsChanged.next(this.flights.slice());
    }

    getLength() {
        return this.flights.length;
    }

    normalizeN(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].n = i + 1;
        }
    }

    humanizeAge(duration: moment.Duration) {
        let years = duration.years();
        let yearsString = '';
        if (years > 1) {
            yearsString = years + ' years';
        } else if (years === 1) {
            yearsString = years + ' year';
        }

        let months = duration.months();
        let monthsString = '';
        if (months > 1) {
            monthsString = months + ' months';
        } else if (months === 1) {
            monthsString = months + ' month';
        }

        let days = duration.days();
        let hours = duration.hours();
        let minutes = duration.minutes();
        if (hours > 0 || minutes > 0) {
            days++;
        }
        let daysString = '';
        if (days > 1) {
            daysString = days + ' days';
        } else if (days === 1) {
            daysString = days + ' day';
        }

        let string = '';

        if (yearsString) {
            string = yearsString;
            if (monthsString) {
                string += ', ' + monthsString;
            }
            if (daysString) {
                string += ', ' + daysString;
            }
            string += '.';
        } else if (!yearsString && monthsString) {
            string = monthsString;
            if (daysString) {
                string += ', ' + daysString;
            }
            string += '.';
        } else if (!yearsString && !monthsString && daysString) {
            string = daysString + '.';
        }

        return string;
    }

}
