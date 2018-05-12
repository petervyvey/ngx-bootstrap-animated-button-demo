import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from '@components/animated-button/animated-button-settings';
import { AnimatedButtonState } from '@components/animated-button/animated-button-state';
import { BehaviorSubject, Observable, ReplaySubject, Scheduler } from 'rxjs/Rx';

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
    public disabled$ = new BehaviorSubject<boolean>(false);

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

    @Input()
    set disabled(value: boolean) { this.disabled$.next(value); }

    get innerState(): AnimatedButtonState {return this.innerState$.value;}
    set innerState(value: AnimatedButtonState) { this.innerState$.next(value); }

    get settings(): IAnimatedButtonSettings { return this.settings$.value; }
    set settings(value: IAnimatedButtonSettings) { this.settings$.next(value); }

    ngOnInit() {
        this.options$
            .takeUntil(this.destroy$)
            .map(options => this.settings = {...animatedButtonDefaultSettings, ...options})
            .subscribe(() => this.applySettings());

        this.outerState$
            .takeUntil(this.destroy$)
            .switchMap(outer => {
                switch (outer) {
                    case AnimatedButtonState.Success:
                    case AnimatedButtonState.Error:
                        return Observable
                            .of(outer)
                            .delay(this.settings.submittingTimeOut);

                    default:
                        return Observable.of(outer);
                }
            })
            .subscribe(outer => this.innerState = outer);

        this.innerState$
            .takeUntil(this.destroy$)
            .observeOn(Scheduler.async)
            .distinctUntilChanged()
            .filter(inner => !!inner)
            .switchMap(inner => {
                switch (inner) {
                    case AnimatedButtonState.Success:
                    case AnimatedButtonState.Error:
                        return Observable
                            .of(inner)
                            .do(current => this.applyStyle(current))
                            .delay(this.settings.completedTimeOut)
                            .do(() => this.innerState = AnimatedButtonState.Default);

                    default:
                        return Observable
                            .of(inner)
                            .do(current => this.applyStyle(current));
                }
            })
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    private applySettings() {
        this.buttonCssClasses['sa-btn-animated'] = true;

        this.buttonCssClasses['btn'] = true;
        this.buttonCssClasses[this.settings.defaultClass] = true;
        this.buttonCssClasses[this.settings.submittingClass] = false;
        this.buttonCssClasses[this.settings.successClass] = false;
        this.buttonCssClasses[this.settings.errorClass] = false;

        this.contentCssClasses['flex-row-reverse'] = this.settings.iconPosition !== 'left';
        this.contentCssClasses['flex-row'] = this.settings.iconPosition === 'left';
    }

    private applyStyle(innerState: AnimatedButtonState) {
        switch (innerState) {
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
    }
}
