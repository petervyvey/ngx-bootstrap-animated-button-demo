import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from '@components/animated-button/animated-button-settings';
import { AnimatedButtonState } from '@components/animated-button/animated-button-state';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'app-component-animated-button',
    templateUrl: './animated-button.component.html',
    styleUrls: ['./animated-button.component.scss']
})
export class AnimatedButtonComponent implements OnInit, OnDestroy {

    constructor() { }

    private static readonly DEFAULT_SUBMITTING_TEXT: string = 'Submitting...';
    private static readonly DEFAULT_SUCCESS_TEXT: string = 'Completed';
    private static readonly DEFAULT_ERROR_TEXT: string = 'Failed';

    buttonCssClasses: ICssClasses = {};
    contentCssClasses: ICssClasses = {};

    public outerState$ = new BehaviorSubject<AnimatedButtonState>(AnimatedButtonState.Default);
    public innerState$ = new BehaviorSubject<AnimatedButtonState>(AnimatedButtonState.Default);
    public submittingText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_SUBMITTING_TEXT);
    public successText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_SUCCESS_TEXT);
    public errorText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_ERROR_TEXT);

    private destroy$ = new ReplaySubject<boolean>();
    private options$ = new BehaviorSubject<Partial<IAnimatedButtonSettings>>({});
    private settings$ = new BehaviorSubject<IAnimatedButtonSettings>(Object.assign({}, animatedButtonDefaultSettings));

    @Input()
    set options(value: Partial<IAnimatedButtonSettings>) { this.options$.next(value); }

    @Input('state')
    set outerState(value: AnimatedButtonState) { this.outerState$.next(value); }

    @Input()
    set submittingText(value: string) { this.submittingText$.next(value); }

    @Input()
    set successText(value: string) { this.successText$.next(value); }

    @Input()
    set errorText(value: string) { this.errorText$.next(value); }

    get innerState(): AnimatedButtonState {return this.innerState$.value;}
    set innerState(value: AnimatedButtonState) { this.innerState$.next(value); }

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

        Observable.combineLatest(this.outerState$, this.innerState$)
            .takeUntil(this.destroy$)
            .filter(([outer, inner]) => !!outer && !!inner)
            .debounceTime(20)
            .subscribe(([outer, inner]) => {
                switch (inner) {
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

        this.outerState$
            .takeUntil(this.destroy$)
            .filter(x => !!x)
            .subscribe(outer => this.innerState = outer);

        this.innerState$
            .takeUntil(this.destroy$)
            .filter(inner => inner === AnimatedButtonState.Success || inner === AnimatedButtonState.Error)
            .throttleTime(2000)
            .debounceTime(2000)
            .subscribe(() => this.innerState = AnimatedButtonState.Default);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
