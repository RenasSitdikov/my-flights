import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StartComponent } from './start.component';

const startRoutes = [
    {path: '', component: StartComponent},
];

@NgModule({
    imports: [RouterModule.forChild(startRoutes)],
    exports: [RouterModule]
})
export class StartRoutingModule {}
