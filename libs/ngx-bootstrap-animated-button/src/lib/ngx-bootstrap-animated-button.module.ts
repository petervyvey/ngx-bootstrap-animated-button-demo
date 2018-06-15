import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedButtonModule } from "./shared/components/animated-button/animated-button.module";

@NgModule({
    imports: [
        CommonModule,
        AnimatedButtonModule
    ]
})
export class NgxBootstrapAnimatedButtonModule {
}

