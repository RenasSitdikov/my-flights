import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatIconModule
    ],
    exports: [
        CommonModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class MaterialModule {}
