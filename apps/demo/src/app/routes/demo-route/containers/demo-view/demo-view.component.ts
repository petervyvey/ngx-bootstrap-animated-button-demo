import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FakeApiService } from "@demo/shared/services/fake-api/fake-api.service";
import { IAnimatedButtonSettings } from "@demo/shared/components/animated-button/animated-button-settings";
import { AnimatedButtonState } from "@demo/shared/components/animated-button/animated-button-state";

@Component({
    selector: 'app-demo-view',
    templateUrl: './demo-view.component.html',
    styleUrls: ['./demo-view.component.scss']
})
export class DemoViewComponent implements OnInit {

    constructor(private api: FakeApiService) {
    }

    options: Partial<IAnimatedButtonSettings> = {
        completedTimeOut: 1000,
        returnToDefaultState: true,
        enabledOnSuccess: true
    };

    basicState = AnimatedButtonState.Default;
    errorState = AnimatedButtonState.Default;
    validationState = AnimatedButtonState.Default;

    requiredField: string;

    ngOnInit() {
    }

    onBasicSubmitted(basic: NgForm) {
        this.basicState = AnimatedButtonState.Submitting;
        this.api.doSomething()
            .first()
            .subscribe(() => this.basicState = AnimatedButtonState.Success);
    }

    onErrorSubmitted(error: NgForm) {
        this.errorState = AnimatedButtonState.Submitting;
        this.api.doSomethingStupid()
            .first()
            .subscribe(
                () => this.errorState = AnimatedButtonState.Success,
                () => this.errorState = AnimatedButtonState.Error
            );
    }

    onValidationSubmitted(validation: NgForm) {
        this.validationState = AnimatedButtonState.Submitting;
        this.api.doSomething()
            .first()
            .subscribe(() => this.validationState = AnimatedButtonState.Success);
    }

}
