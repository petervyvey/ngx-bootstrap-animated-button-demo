import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FakeApiService {

    constructor() { }

    doSomething(): Observable<boolean> {
        return Observable
            .of(true)
            .delay(2000);
    }

}
