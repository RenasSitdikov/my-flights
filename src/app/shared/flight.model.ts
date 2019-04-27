// import { Moment } from "moment";

import * as moment from 'moment';

export class Flight {

    public n: number;
    public date: moment.Moment;
    public airline: string;
    public altairline: string;
    public aircraft: string;
    public registration: string;
    public flight: string;
    public altflight: string;
    public origin: string;
    public forigin: string;
    public destination: string;
    public fdestination: string;
    public seat: string;
    public photo: string;
    public link: string;
    public name: string;
    public msn: string;
    public ff: moment.Moment;
    public age: moment.Duration;

    constructor(
        n: number,
        date: moment.Moment,
        airline: string,
        altairline: string,
        aircraft: string,
        registration: string,
        flight: string,
        altflight: string,
        origin: string,
        forigin: string,
        destination: string,
        fdestination: string,
        seat: string,
        photo: string,
        link: string,
        name: string,
        msn: string,
        ff: moment.Moment,
        age: moment.Duration
    ) {
        this.n = n;
        this.date = date;
        this.airline = airline;
        this.altairline = altairline;
        this.aircraft = aircraft;
        this.registration = registration;
        this.flight = flight;
        this.altflight = altflight;
        this.origin = origin;
        this.forigin = forigin;
        this.destination = destination;
        this.fdestination = fdestination;
        this.seat = seat;
        this.photo = photo;
        this.link = link;
        this.name = name;
        this.msn = msn;
        this.ff = ff;
        this.age = age;
    }
}
