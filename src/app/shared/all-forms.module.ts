import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AllFormsModule {}
