import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { UserEffects } from './user/store/user.effects';
import { UserReducer } from './user/store/user.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(
            provideFirebaseApp(() =>
                initializeApp({
                    projectId: 'lucra-expenses',
                    appId: '1:930972789129:web:084c301d6b3b42e4e1d958',
                    storageBucket: 'lucra-expenses.appspot.com',
                    apiKey: 'AIzaSyChrnWF3Q4BWp6sbf1LiHv14gozLGwjr0A',
                    authDomain: 'lucra-expenses.firebaseapp.com',
                    messagingSenderId: '930972789129',
                    measurementId: 'G-76N6P2NNTG',
                }),
            ),
        ),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideFirestore(() => getFirestore())),
        provideAnimationsAsync(),
        importProvidersFrom(
            StoreModule.forRoot({
                User: UserReducer,
            }),
            StoreDevtoolsModule.instrument(),
            EffectsModule.forRoot([UserEffects]),
        ),
        { provide: MAT_DATE_LOCALE, useValue: 'en-UK' },
    ],
};
