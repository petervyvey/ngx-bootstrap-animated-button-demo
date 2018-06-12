import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoRouteRoutingModule } from './demo-route-routing.module';
import { DemoViewModule } from "@demo/routes/demo-route/containers/demo-view/demo-view.module";

@NgModule({
    imports: [
        CommonModule,
        DemoViewModule,
        DemoRouteRoutingModule
    ]
})
export class DemoRouteModule {
}
