import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimatedButtonState } from '@components/animated-button/animated-button-state';
import { FakeApiService } from '@services/fake-api/fake-api.service';

@Component({
    selector: 'app-demo-view',
    templateUrl: './demo-view.component.html',
    styleUrls: ['./demo-view.component.scss']
})
export class DemoViewComponent implements OnInit {

    constructor(private api: FakeApiService) { }

    animating = AnimatedButtonState.Default;

    ngOnInit() {
    }

    onBasicSubmitted(basic: NgForm) {
        console.log('basic', basic);
        this.animating = AnimatedButtonState.Submitting;
        this.api.doSomething()
            .first()
            .subscribe(x => {
                console.log('api', x);
                this.animating = AnimatedButtonState.Success;
            });
    }

}
