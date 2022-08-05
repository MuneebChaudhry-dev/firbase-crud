import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private route: Router) {}

  //register
  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.emailVerify(res.user);
        alert('Registeration Successful');
        this.route.navigate(['login']);
      },
      (err) => {
        console.log(err.message);
        this.route.navigate(['/register']);
      }
    );
  }

  //login
  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        res.user?.emailVerified == true
          ? this.route.navigate(['dashboard'])
          : this.route.navigate(['dashboard']);
      },
      (err) => {
        console.log(err.message);
        this.route.navigate(['login']);
      }
    );
  }

  //signout
  signout() {
    this.auth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.route.navigate(['login']);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  //forgot
  forgotpassword(email: string) {
    this.auth.sendPasswordResetEmail(email).then(
      () => {
        this.route.navigate(['/verify-email']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //Email Verification
  emailVerify(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.route.navigate(['/verify-email']);
      },
      (err: any) => {
        alert('Something went wrong.Not able to send Email');
      }
    );
  }
}
