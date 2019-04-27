// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageServiceGet } from '../shared/data-storage-get.service';
import { FlightsService } from '../shared/flights.service';
import { StatusService } from '../shared/status.service';

@Injectable()
export class AuthService {
    token: string;
    uid: string;
    uData;

    firebaseConfig = {
        apiKey: 'AIzaSyCFFWLVR1nOoYbT3Fd1A5qdMUvJrlEM_WY',
        authDomain: 'renas-flights.firebaseapp.com',
        databaseURL: 'https://renas-flights.firebaseio.com',
        projectId: 'renas-flights',
        storageBucket: 'renas-flights.appspot.com',
        messagingSenderId: '694118369793'
    };

    constructor (
        private router: Router,
        private dataStorageServiceGet: DataStorageServiceGet,
        private flightsService: FlightsService,
        private statusService: StatusService
        ) {}

    initAuthentication() {
        firebase.initializeApp(this.firebaseConfig);
        firebase.auth().onAuthStateChanged(
          (user) => {
          if (user) {
            // User is signed in.
            console.log('User is signed in.');
            this.authenticate();
          } else {
            // No user is signed in.
            console.log('No user is signed in.');
            this.unAuthenticate();
          }
        });
    }
    authenticate() {
        this.statusService.spin();
        this.statusService.clearMessages();
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => {
                // if (this.isVerified()) {
                    this.statusService.stopSpin();
                    this.token = token;
                    this.uid = this.getUID();
                    this.setData();
                    this.dataStorageServiceGet.getFlights(this.token, this.uid);
                // }
                this.statusService.protectOutside();
            }
        ).catch(error => this.detectError(error));
    }
    unAuthenticate() {
        this.token = null;
        this.uid = null;
        this.uData = null;
        this.flightsService.dismissFlights();
        this.statusService.protectInside();
    }
    logout() {
        firebase.auth().signOut();
        this.router.navigate(['']);
    }
    signupUser(email: string, password: string) {
        this.statusService.spin();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
            this.detectResponse(response);
            firebase.auth().currentUser.sendEmailVerification();
            this.statusService.setSuccessMessage('The email verification link sent to ' + email);
            }
        )
        .catch(error => this.detectError(error));
    }
    signinUser(email: string, password: string) {
        this.statusService.spin();
        console.log('Current user before:');
        console.log(firebase.auth().currentUser);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            this.detectResponse(response);
            this.statusService.setSuccessMessage('You are logging in');
        })
        .catch(error => this.detectError(error));
    }
    signInViaProvider(providerName) {
        this.statusService.spin();
        let provider;
        if (providerName === 'google') {
            provider = new firebase.auth.GoogleAuthProvider();
        } else if (providerName === 'facebook') {
            provider = new firebase.auth.FacebookAuthProvider();
        } else if (providerName === 'github') {
            provider = new firebase.auth.GithubAuthProvider();
        }
        firebase.auth().signInWithPopup(provider)
        .then(response => {
            this.detectResponse(response);
            this.statusService.setSuccessMessage('You are logging in');
        })
        .catch(error => this.detectError(error));
    }
    resetPassword(email) {
        this.statusService.spin();
        firebase.auth().sendPasswordResetEmail(email)
        .then(response => {
            this.detectResponse(response);
            this.statusService.setSuccessMessage('The reset password link sent to ' + email);
        })
        .catch(error => this.detectError(error));
    }
    updateData(name: string, email: string, password: string) {
        if (name) {
            this.statusService.spin();
            firebase.auth().currentUser.updateProfile({displayName: name})
            .then(response => {
                this.detectResponse(response);
                this.statusService.setSuccessMessage('Information updated');
            })
            .catch(error => this.detectError(error));
        }
        if (email) {
            this.statusService.spin();
            firebase.auth().currentUser.updateEmail(email)
            .then(response => {
                this.detectResponse(response);
                this.statusService.setSuccessMessage('Information updated');
            })
            .catch(error => this.detectError(error));
        }
        if (password) {
            this.statusService.spin();
            firebase.auth().currentUser.updatePassword(password)
            .then(response => {
                this.detectResponse(response);
                this.statusService.setSuccessMessage('Information updated');
        })
          .catch(error => this.detectError(error));
        }
    }
    sendVerificationEmail() {
        this.statusService.spin();
        firebase.auth().currentUser.sendEmailVerification()
        .then(response => {
            this.detectResponse(response);
            this.statusService.setSuccessMessage('Verification message sent');
        })
        .catch(error => this.detectError(error));
    }
    detectError(error) {
        this.statusService.stopSpin();
        console.log(error);
        console.log(error.code);
        console.log(error.message);
        this.statusService.setErrorMessage(error.message);
    }
    detectResponse(response) {
        this.statusService.stopSpin();
        console.log(response);
    }

    setData() {
        const user = firebase.auth().currentUser;
        if (user != null) {
            this.uData = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                provider: user.providerData[0].providerId
            };
            console.log(this.uData);
        }
    }
    getData() {
        const user = firebase.auth().currentUser;
        const uData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            provider: user.providerData[0].providerId
        };
        return uData;
    }
    getToken() {
      firebase.auth().currentUser.getIdToken()
      .then(
          (token: string) => this.token = token
      );
      return this.token;
    }
    getUID() {
        return this.uid = firebase.auth().currentUser.uid;
    }

    // isAuthenticated() {
    //     return this.authenticated;
    // }
    // isRedirecting() {
    //     return this.redirection;
    // }

    isVerified() {
        return firebase.auth().currentUser.emailVerified;
    }

}
