<<<<<<< Updated upstream:src/app/shared/containers/layout/layout.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '@containers/navigation/navigation.module';
import { LayoutComponent } from './layout.component';
=======
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NavigationComponent} from '@components/navigation/navigation.component';
import {NavigationModule} from '@components/navigation/navigation.module';
import {LayoutComponent} from './layout.component';
>>>>>>> Stashed changes:src/app/shared/components/layout/layout.module.ts

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
