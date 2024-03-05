import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  auth = getAuth();

  constructor(private router: Router) {
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/sign-in'])
    })
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then(() => {
      alert('User registered successfully');
      this.router.navigate(['/sign-in']);
    }, err => {
      alert('Something went wrong');
      this.router.navigate(['/sign-up']);
    })
  }

  logout() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/sign-in']);
    })
  }
}
