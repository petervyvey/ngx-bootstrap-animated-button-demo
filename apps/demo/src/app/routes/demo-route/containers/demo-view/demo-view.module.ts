import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoViewComponent } from '@demo/routes/demo-route/containers/demo-view/demo-view.component';
import { FakeApiService } from '@demo/shared/services/fake-api/fake-api.service';
import { NgxBootstrapAnimatedButtonModule } from '@ngx-bootstrap-animated-button/ngx-bootstrap-animated-button';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxBootstrapAnimatedButtonModule
    ],
    declarations: [
        DemoViewComponent
    ],
    providers: [
        FakeApiService
    ]
})
export class DemoViewModule {}
