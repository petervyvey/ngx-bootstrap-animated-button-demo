import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimatedButtonModule } from '@components/animated-button/animated-button.module';
import { DemoViewComponent } from '@routes/demo-route/containers/demo-view/demo-view.component';
import { FakeApiService } from '@services/fake-api/fake-api.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AnimatedButtonModule
    ],
    declarations: [
        DemoViewComponent
    ],
    providers: [
        FakeApiService
    ]
})
export class DemoViewModule {
}
