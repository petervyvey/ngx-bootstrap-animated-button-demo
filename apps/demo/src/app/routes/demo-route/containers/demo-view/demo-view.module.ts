import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoViewComponent } from '@demo/routes/demo-route/containers/demo-view/demo-view.component';
import { FakeApiService } from '@demo/shared/services/fake-api/fake-api.service';
import { AnimatedButtonModule } from '@ngx-bootstrap-animated-button/src/lib/shared/components/animated-button/animated-button.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AnimatedButtonModule
    ],
    declarations: [
        DemoViewComponent
    ],
    providers: [
        FakeApiService
    ]
})
export class DemoViewModule {}
