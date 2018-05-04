import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '@containers/navigation/navigation.module';
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
export class LayoutModule {}
