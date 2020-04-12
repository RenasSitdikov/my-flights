import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { FlightsService } from '../shared/flights.service';
import { Flight } from '../shared/flight.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { StatusService } from '../shared/status.service';
import { Title } from '@angular/platform-browser';
import getSearchLink from '../shared/utils/searchLink';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.sass'],
  animations: [
    trigger('detailExpand', [
      // Expandable table's animation is lagging fix https://github.com/angular/components/issues/15491
      // Changes also in styles.sass
      state('collapsed', style({height: '0px', minHeight: '0'})),
      // Original
      // state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FlightTableComponent implements OnInit, OnDestroy {

  dataLength: number;
  filterValue: string;
  flights: Flight[];
  subscription: Subscription;
  dataSource: MatTableDataSource<Flight>;
  columnsToDisplay = ['n', 'date', 'airline', 'origin', 'destination', 'aircraft', 'registration'];
  expandedElement: Flight | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flightsService: FlightsService,
    private titleService: Title,
    private statusService: StatusService
    ) { }

  ngOnInit() {
    this.titleService.setTitle('My Flights');
    this.subscription = this.flightsService.flightsChanged.subscribe(
      (flights: Flight[]) => {
        this.dataSource = new MatTableDataSource<Flight>(flights);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLength = this.dataSource.filteredData.length;
      }
    );
    this.statusService.inside();

    this.dataSource = new MatTableDataSource<Flight>(this.flightsService.getFlights());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataLength = this.dataSource.filteredData.length;
    console.log('Table component inited!');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  humanizeAge(age: moment.Duration) {
    return this.flightsService.humanizeAge(age);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchLink(reg: string) {
    return getSearchLink(reg);
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
