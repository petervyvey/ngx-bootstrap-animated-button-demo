import { Component, Input, OnInit } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from '@components/animated-button/animated-button-settings';
import { AnimatedButtonState } from '@components/animated-button/animated-button-state';
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
    public state$ = new BehaviorSubject<AnimatedButtonState>(AnimatedButtonState.Default);
    public submittingText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_SUBMITTING_TEXT);

    @Input()
    set options(value: Partial<IAnimatedButtonSettings>) { this.options$.next(value); }

    @Input()
    set state(value: AnimatedButtonState) { this.state$.next(value); }

    @Input()
    set animatingText(value: string) { this.submittingText$.next(value); }

    get settings(): IAnimatedButtonSettings { return this.settings$.value; }
    set settings(value: IAnimatedButtonSettings) { this.settings$.next(value); }

    ngOnInit() {
        this.options$
            .map(options => this.settings = {...animatedButtonDefaultSettings, ...options})
            .subscribe(
                settings => {
                    this.buttonCssClasses['sa-btn-animated'] = true;

                    this.buttonCssClasses['btn'] = true;
                    this.buttonCssClasses[settings.defaultClass] = true;
                    this.buttonCssClasses[settings.submittingClass] = false;
                    this.buttonCssClasses[settings.successClass] = false;
                    this.buttonCssClasses[settings.errorClass] = false;

                    this.contentCssClasses['flex-row-reverse'] = settings.iconPosition !== 'left';
                    this.contentCssClasses['flex-row'] = settings.iconPosition === 'left';
                });

        this.state$
            .filter(x => !!x)
            .subscribe(x => {
                switch (x) {
                    case AnimatedButtonState.Default:
                        this.buttonCssClasses[this.settings.defaultClass] = true;
                        this.buttonCssClasses[this.settings.submittingClass] = false;
                        this.buttonCssClasses[this.settings.successClass] = false;
                        this.buttonCssClasses[this.settings.errorClass] = false;
                        break;

                    case AnimatedButtonState.Submitting:
                        this.buttonCssClasses[this.settings.defaultClass] = false;
                        this.buttonCssClasses[this.settings.submittingClass] = true;
                        this.buttonCssClasses[this.settings.successClass] = false;
                        this.buttonCssClasses[this.settings.errorClass] = false;
                        break;

                    case AnimatedButtonState.Success:
                        this.buttonCssClasses[this.settings.defaultClass] = false;
                        this.buttonCssClasses[this.settings.submittingClass] = false;
                        this.buttonCssClasses[this.settings.successClass] = true;
                        this.buttonCssClasses[this.settings.errorClass] = false;
                        break;

                    case AnimatedButtonState.Error:
                        this.buttonCssClasses[this.settings.defaultClass] = false;
                        this.buttonCssClasses[this.settings.submittingClass] = false;
                        this.buttonCssClasses[this.settings.successClass] = false;
                        this.buttonCssClasses[this.settings.errorClass] = true;
                        break;
                }

            });
    }

}
