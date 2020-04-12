import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Flight } from './flight.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataStorageServiceStore {
    constructor(
        private http: HttpClient,
        ) {}

    storeFlights(data: Flight[], tk, uid) {
        return this.http.put(
            'https://renas-flights.firebaseio.com/flights_' + uid + '.json?auth=' + tk,
            data)
            .map((response: HttpResponse<[]>) => {
                console.log('this is response');
                console.log(response);
            })
            .catch((error: HttpErrorResponse) => {
                console.log('this is error');
                console.log(error);
                return Observable.throw(error);
            });
    }

}
