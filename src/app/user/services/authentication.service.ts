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
        signInWithEmailAndPassword(this.auth, email, password).then(
            () => {
                localStorage.setItem('token', 'true');
                this.router.navigate(['dashboard']);
            },
            err => {
                alert(err.message);
                this.router.navigate(['/sign-in']);
            },
        );
    }

    register(email: string, password: string, name: string) {
        createUserWithEmailAndPassword(this.auth, email, password).then(
            userCredential => {
                this.createUserFirebaseDoc(userCredential.user, name).then(() => {
                    alert('User registered successfully');
                    this.router.navigate(['/dashboard']).then();
                });
            },
            () => {
                alert('Something went wrong');
                this.router.navigate(['/sign-up']).then();
            },
        );
    }

    createUserFirebaseDoc(user: User, name: string) {
        updateProfile(user, { displayName: name }).then();
        const userRef = doc(this.firestore, 'users', user.uid);
        return setDoc(userRef, {
            email: user.email,
            uid: user.uid,
            name,
        });
    }

    logout() {
        signOut(this.auth).then(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/sign-in']).then();
        });
    }
}
