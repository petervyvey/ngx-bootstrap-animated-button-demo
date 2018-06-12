import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {NavigationModule} from "@demo/shared/containers/navigation/navigation.module";

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
