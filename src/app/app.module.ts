import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutesRoutingModule } from '@routes/routes-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RoutesRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
