import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.sass']
})
export class StatusMessageComponent implements OnInit {

  constructor(private statusService: StatusService) { }

  ngOnInit() {
  }

  errorMessage() {
    return this.statusService.getErrorMessage();
  }
  successMessage() {
    return this.statusService.getSuccessMessage();
  }

}
