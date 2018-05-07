import { Component, Input, OnInit } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from '@components/animated-button/animated-button-settings';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'app-component-animated-button',
    templateUrl: './animated-button.component.html',
    styleUrls: ['./animated-button.component.scss']
})
export class AnimatedButtonComponent implements OnInit {

    constructor() { }

    private static readonly DEFAULT_SUBMITTING_TEXT: string = 'Submitting...';

    buttonCssClasses: ICssClasses = {};
    contentCssClasses: ICssClasses = {};

    private options$ = new BehaviorSubject<Partial<IAnimatedButtonSettings>>({});
    private settings$ = new BehaviorSubject<IAnimatedButtonSettings>(Object.assign({}, animatedButtonDefaultSettings));
    public animating$ = new BehaviorSubject<boolean>(true);
    public animatingText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_SUBMITTING_TEXT);

    @Input()
    set options(value: Partial<IAnimatedButtonSettings>) { this.options$.next(value); }

    @Input()
    set animating(value: boolean) { this.animating$.next(value); }

    @Input()
    set animatingText(value: string) { this.animatingText$.next(value); }

    get settings(): IAnimatedButtonSettings { return this.settings$.value; }
    set settings(value: IAnimatedButtonSettings) { this.settings$.next(value); }

    ngOnInit() {
        this.options$
            .map(options => this.settings = {...animatedButtonDefaultSettings, ...options})
            .subscribe(
                settings => {
                    this.buttonCssClasses['sa-btn-animated'] = true;

                    this.buttonCssClasses['btn'] = true;
                    this.buttonCssClasses['btn-primary'] = settings.defaultClass === 'btn-primary';
                    this.buttonCssClasses['btn-warning'] = settings.defaultClass === 'btn-warning';
                    this.buttonCssClasses['btn-danger'] = settings.defaultClass === 'btn-danger';

                    this.contentCssClasses['flex-row-reverse'] = settings.iconPosition !== 'left';
                    this.contentCssClasses['flex-row'] = settings.iconPosition === 'left';
                });
    }

}
