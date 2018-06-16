import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from './shared/components/animated-button/animated-button-settings';
import { AnimatedButtonState } from './shared/components/animated-button/animated-button-state';
import { AnimatedButtonModule } from './shared/components/animated-button/animated-button.module';


@NgModule({
    imports: [
        CommonModule,
        AnimatedButtonModule
    ]
})
export class NgxBootstrapAnimatedButtonModule {}

export { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses };
export { AnimatedButtonState };

