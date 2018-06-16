import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { animatedButtonDefaultSettings, IAnimatedButtonSettings, ICssClasses } from '@ngx-bootstrap-animated-button/src/lib/shared/components/animated-button/animated-button-settings';
import { AnimatedButtonState } from '@ngx-bootstrap-animated-button/src/lib/shared/components/animated-button/animated-button-state';
import { asyncScheduler, BehaviorSubject, ReplaySubject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { delay, distinctUntilChanged, filter, map, observeOn, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'msq-component-animated-button',
    templateUrl: './animated-button.component.html',
    styleUrls: ['./animated-button.component.scss']
})
export class AnimatedButtonComponent implements OnInit, OnDestroy {

    constructor() {
    }

    private static readonly DEFAULT_SUBMITTING_TEXT: string = 'Submitting...';
    private static readonly DEFAULT_SUCCESS_TEXT: string = 'Completed';
    private static readonly DEFAULT_ERROR_TEXT: string = 'Failed';

    buttonCssClasses: ICssClasses = {};
    contentCssClasses: ICssClasses = {};

    outerState$ = new BehaviorSubject<AnimatedButtonState>(AnimatedButtonState.Default);
    innerState$ = new BehaviorSubject<AnimatedButtonState>(AnimatedButtonState.Default);
    submittingText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_SUBMITTING_TEXT);
    successText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_SUCCESS_TEXT);
    errorText$ = new BehaviorSubject<string>(AnimatedButtonComponent.DEFAULT_ERROR_TEXT);
    disabled$ = new BehaviorSubject<boolean>(false);

    private destroy$ = new ReplaySubject<boolean>();
    private options$ = new BehaviorSubject<Partial<IAnimatedButtonSettings>>({});
    private settings$ = new BehaviorSubject<IAnimatedButtonSettings>(Object.assign({}, animatedButtonDefaultSettings));

    @Input()
    set options(value: Partial<IAnimatedButtonSettings>) {
        this.options$.next(value);
    }

    @Input('state')
    set outerState(value: AnimatedButtonState) {
        this.outerState$.next(value);
    }

    @Input()
    set submittingText(value: string) {
        this.submittingText$.next(value);
    }

    @Input()
    set successText(value: string) {
        this.successText$.next(value);
    }

    @Input()
    set errorText(value: string) {
        this.errorText$.next(value);
    }

    @Input()
    set disabled(value: boolean) {
        this.disabled$.next(value);
    }

    get disabled(): boolean {
        let disabled = false;
        if (this.settings.enabledOnSuccess) {
            disabled = [AnimatedButtonState.Submitting].indexOf(this.innerState) > -1;
        } else {
            disabled = [AnimatedButtonState.Submitting, AnimatedButtonState.Success, AnimatedButtonState.Error].indexOf(this.innerState) > -1;
        }
        return this.disabled$.value || disabled;
    }

    @Output()
    clicked = new EventEmitter<MouseEvent>();

    get innerState(): AnimatedButtonState {
        return this.innerState$.value;
    }

    set innerState(value: AnimatedButtonState) {
        this.innerState$.next(value);
    }

    get settings(): IAnimatedButtonSettings {
        return this.settings$.value;
    }

    set settings(value: IAnimatedButtonSettings) {
        this.settings$.next(value);
    }

    ngOnInit() {
        this.options$
            .pipe(
                takeUntil(this.destroy$),
                map(options => this.settings = {...animatedButtonDefaultSettings, ...options})
            )
            .subscribe(() => this.applySettings());

        this.outerState$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(outer => {
                    switch (outer) {
                        case AnimatedButtonState.Success:
                        case AnimatedButtonState.Error:
                            return of(outer)
                                .pipe(
                                    delay(this.settings.submittingTimeOut)
                                );

                        default:
                            return of(outer);
                    }
                })
            )
            .subscribe(outer => this.innerState = outer);

        this.innerState$
            .pipe(
                takeUntil(this.destroy$),
                observeOn(asyncScheduler),
                distinctUntilChanged(),
                filter(inner => !!inner),
                switchMap(inner => {
                        switch (inner) {
                            case AnimatedButtonState.Success:
                            case AnimatedButtonState.Error:
                                return of(inner)
                                    .pipe(
                                        tap(current => this.applyStyle(current)),
                                        delay(this.settings.completedTimeOut),
                                        tap(() => {
                                            if (this.settings.returnToDefaultState) {
                                                this.innerState = AnimatedButtonState.Default;
                                            }
                                        })
                                    );

                            default:
                                return of(inner)
                                    .pipe(
                                        tap(current => this.applyStyle(current))
                                    );
                        }
                    }
                )
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    onClicked(event: MouseEvent) {
        event.stopPropagation();
        if (this.disabled$.value !== true) {
            this.clicked.emit(event);
        }
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
