import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AnimatedButtonState } from '@components/animated-button/animated-button-state';
import { FakeApiService } from '@services/fake-api/fake-api.service';

@Component({
    selector: 'app-demo-view',
    templateUrl: './demo-view.component.html',
    styleUrls: ['./demo-view.component.scss']
})
export class DemoViewComponent implements OnInit {

    constructor(private api: FakeApiService) { }

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
