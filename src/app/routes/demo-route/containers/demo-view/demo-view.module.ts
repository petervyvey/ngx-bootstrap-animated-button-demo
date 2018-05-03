import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnimatedButtonModule } from '@components/animated-button/animated-button.module';
import { DemoViewComponent } from '@routes/demo-route/containers/demo-view/demo-view.component';

@NgModule({
    imports: [
        CommonModule,
        AnimatedButtonModule
    ],
    declarations: [
        DemoViewComponent
    ]
})
export class DemoViewModule {
}
