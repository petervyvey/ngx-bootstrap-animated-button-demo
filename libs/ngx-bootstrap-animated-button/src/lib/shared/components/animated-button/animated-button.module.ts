import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AnimatedButtonComponent } from '@ngx-bootstrap-animated-button/src/lib/shared/components/animated-button/animated-button.component';

@NgModule({
    imports: [
        CommonModule,
        AngularFontAwesomeModule
    ],
    exports: [AnimatedButtonComponent],
    declarations: [AnimatedButtonComponent]
})
export class AnimatedButtonModule {
}
