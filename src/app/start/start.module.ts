import { NgModule } from '@angular/core';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { StatusMessageModule } from '../shared/status-message/status-message.module';

@NgModule({
    declarations: [
        StartComponent
    ],
    imports: [
        CommonModule,
        StartRoutingModule,
        MatListModule,
        MatIconModule,
        StatusMessageModule
    ]
})
export class StartModule {}
