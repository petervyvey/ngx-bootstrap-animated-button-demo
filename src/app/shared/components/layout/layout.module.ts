import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { NavigationModule } from '@components/navigation/navigation.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        NavigationModule
    ],
    exports: [
        NavigationModule,
        LayoutComponent
    ],
    declarations: [
        LayoutComponent
    ]
})
export class LayoutModule {
}
