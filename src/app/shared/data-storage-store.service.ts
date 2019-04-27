import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Flight } from './flight.model';
import 'rxjs/Rx';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataStorageServiceStore {
    constructor(
        private http: Http,
        ) {}

    storeFlights(data: Flight[], tk, uid) {
        return this.http.put(
            'https://renas-flights.firebaseio.com/flights_' + uid + '.json?auth=' + tk,
            data)
            .map((response: Response) => {
                console.log('this is response');
                console.log(response);
            })
            .catch((error: any) => {
                console.log('this is error');
                console.log(error);
                return Observable.throw(error);
            });
    }

}
