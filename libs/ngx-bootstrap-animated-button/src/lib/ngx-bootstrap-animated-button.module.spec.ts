import { async, TestBed } from '@angular/core/testing';
import { NgxBootstrapAnimatedButtonModule } from './ngx-bootstrap-animated-button.module';

describe('NgxBootstrapAnimatedButtonModule', () => {
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [NgxBootstrapAnimatedButtonModule]
            }).compileComponents();
        })
    );

    it('should create', () => {
        expect(NgxBootstrapAnimatedButtonModule).toBeDefined();
    });
});
