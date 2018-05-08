import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FakeApiService {

    constructor() { }

    doSomething(): Observable<boolean> {
        return Observable
            .of(true)
            .delay(3000);
    }

    doSomethingStupid(): Observable<any> {
        return Observable
            .of(null)
            .delay(3000)
            .switchMap(() => Observable.throw('Something went wrong'));
    }

}
