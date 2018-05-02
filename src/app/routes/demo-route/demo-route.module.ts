import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoViewComponent } from './containers/demo-view/demo-view.component';
import { DemoRouteRoutingModule } from './demo-route-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DemoRouteRoutingModule
    ],
    declarations: [
        DemoViewComponent
    ]
})
export class DemoRouteModule { }
