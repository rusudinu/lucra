import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DashboardComponent } from './layouts/dashboard/dashboard.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
            providers: [provideMockStore({})],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
