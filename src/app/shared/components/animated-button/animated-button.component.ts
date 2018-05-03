import { Component, Input, OnInit } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from '@components/animated-button/animated-button-settings';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'app-component-animated-button',
    templateUrl: './animated-button.component.html',
    styleUrls: ['./animated-button.component.scss']
})
export class AnimatedButtonComponent implements OnInit {

    constructor() {
    }

    @Input()
    get options(): Partial<IAnimatedButtonSettings> {
        return this.options$.value;
    }

    set options(value: Partial<IAnimatedButtonSettings>) {
        this.options$.next(value);
    }

    options$ = new BehaviorSubject<Partial<IAnimatedButtonSettings>>({});

    get settings(): IAnimatedButtonSettings {
        return this.settings$.value;
    }

    set settings(value: IAnimatedButtonSettings) {
        this.settings$.next(value);
    }

    settings$ = new BehaviorSubject<IAnimatedButtonSettings>(Object.assign({}, animatedButtonDefaultSettings));

    cssClasses: ICssClasses = {};

    ngOnInit() {
        this.options$
            .map(options => {
                this.settings = Object.assign({}, animatedButtonDefaultSettings, options);
                return {
                    "btn": true,
                    "btn-primary": this.settings.defaultClass === 'btn-primary',
                    "btn-warning": this.settings.defaultClass === 'btn-warning',
                    "btn-danger": this.settings.defaultClass === 'btn-danger',
                    "right": this.settings.iconPosition !== 'left',
                    "left": this.settings.iconPosition === 'left',
                };
            })
            .subscribe(x => this.cssClasses = x);
    }

}
