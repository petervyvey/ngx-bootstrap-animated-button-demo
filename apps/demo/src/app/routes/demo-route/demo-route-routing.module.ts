import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoViewComponent } from '@demo/routes/demo-route/containers/demo-view/demo-view.component';

const routes: Routes = [
    { path: '', component: DemoViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRouteRoutingModule {}
