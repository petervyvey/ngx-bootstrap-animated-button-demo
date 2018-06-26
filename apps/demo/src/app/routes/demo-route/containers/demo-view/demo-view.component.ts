import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { FakeApiService } from '@demo/shared/services/fake-api/fake-api.service';
import { IAnimatedButtonSettings } from '@ngx-bootstrap-animated-button/src/lib/shared/components/animated-button/animated-button-settings';
import { AnimatedButtonState } from '@ngx-bootstrap-animated-button/src/lib/shared/components/animated-button/animated-button-state';
import { first } from 'rxjs/operators';


@Component({
    selector: 'app-demo-view',
    templateUrl: './demo-view.component.html',
    styleUrls: ['./demo-view.component.scss']
})
export class DemoViewComponent implements OnInit {

    constructor(private api: FakeApiService) { }

    options: Partial<IAnimatedButtonSettings> = {
        completedTimeOut: 1000,
        returnToDefaultState: true,
        enabledOnSuccess: true
    };

    basicState = AnimatedButtonState.Default;
    errorState = AnimatedButtonState.Default;
    validationState = AnimatedButtonState.Default;

    requiredField: string;

    settingsFormGroup: FormGroup;

    ngOnInit() {
        this.settingsFormGroup = new FormGroup({
            defaultClass: new FormControl('btn-primary'),
            submittingClass: new FormControl('btn-info'),
            successClass: new FormControl('btn-success'),
            errorClass: new FormControl('btn-danger'),
            iconPosition: new FormControl('left'),
            enabledOnSuccess: new FormControl(true),
            returnToDefaultState: new FormControl(true)
        });
    }


    onSettingsSubmit({ value, valid }: { value: any, valid: boolean }) {
        this.options = {
            ...this.options,
            ...value
        };
    }

    onBasicSubmitted(basic: NgForm) {
        this.basicState = AnimatedButtonState.Submitting;
        this.api.doSomething()
            .pipe(
                first()
            )
            .subscribe(() => this.basicState = AnimatedButtonState.Success);
    }

    onErrorSubmitted(error: NgForm) {
        this.errorState = AnimatedButtonState.Submitting;
        this.api.doSomethingStupid()
            .pipe(
                first()
            )
            .subscribe(
                () => this.errorState = AnimatedButtonState.Success,
                () => this.errorState = AnimatedButtonState.Error
            );
    }

    onValidationSubmitted(validation: NgForm) {
        this.validationState = AnimatedButtonState.Submitting;
        this.api.doSomething()
            .pipe(
                first()
            )
            .subscribe(() => this.validationState = AnimatedButtonState.Success);
    }

}
