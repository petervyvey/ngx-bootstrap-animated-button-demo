import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from './components/animated-button/animated-button-settings';
import { AnimatedButtonState } from './components/animated-button/animated-button-state';
import { AnimatedButtonModule } from './components/animated-button/animated-button.module';


@NgModule({
    imports: [
        CommonModule,
        AnimatedButtonModule
    ]
})
export class NgxBootstrapAnimatedButtonModule {}

export { AnimatedButtonModule };
export { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses };
export { AnimatedButtonState };

