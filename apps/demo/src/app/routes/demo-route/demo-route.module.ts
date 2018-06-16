import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoViewModule } from '@demo/routes/demo-route/containers/demo-view/demo-view.module';
import { DemoRouteRoutingModule } from './demo-route-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DemoViewModule,
        DemoRouteRoutingModule
    ]
})
export class DemoRouteModule {}
