import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    auth = getAuth();
    firestore: Firestore = inject(Firestore);

    constructor(private router: Router) {}

    signIn(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password).then(
            () => {
                this.router.navigate(['dashboard']).then();
            },
            err => {
                alert(err.message);
                this.router.navigate(['/sign-in']).then();
            },
        );
    }

    register(email: string, password: string, name: string, advisorAccount: boolean) {
        return createUserWithEmailAndPassword(this.auth, email, password).then(
            userCredential => {
                this.createUserFirebaseDoc(userCredential.user, name, advisorAccount).then(() => {
                    this.router.navigate(['/dashboard']).then();
                });
            },
            () => {
                alert('Something went wrong');
                this.router.navigate(['/sign-up']).then();
            },
        );
    }

    createUserFirebaseDoc(user: User, name: string, advisorAccount: boolean) {
        updateProfile(user, { displayName: name }).then();
        const userRef = doc(this.firestore, 'users', user.uid);
        return setDoc(userRef, {
            email: user.email,
            uid: user.uid,
            name,
            advisorAccount,
        });
    }

    logout() {
        signOut(this.auth).then(() => {
            this.router.navigate(['/sign-in']).then();
        });
    }
}
