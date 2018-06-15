import { Injectable } from '@angular/core';
import { of } from "rxjs/internal/observable/of";
import { throwError } from "rxjs/internal/observable/throwError";
import { delay, switchMap } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class FakeApiService {

    constructor() {
    }

    doSomething(): Observable<boolean> {
        return of(true)
            .pipe(
                delay(20)
            );
    }

    doSomethingStupid(): Observable<any> {
        return of(null)
            .pipe(
                delay(3000),
                switchMap(() => throwError('Something went wrong'))
            );
    }

}
