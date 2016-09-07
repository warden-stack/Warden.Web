import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient, Router)
export class Login {
    lock = new Auth0Lock('MjJQ06DjPwQWeXbblLHkwYXrgPBvsHwi', 'warden.eu.auth0.com');
    isAuthenticated = false;

    constructor(http, router) {
        this.http = http;
        this.router = router;
        var self = this;
        this.lock.on("authenticated", (authResult) => {
            self.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    return;
                }

                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('profile', JSON.stringify(profile));
                self.isAuthenticated = true;
                self.lock.hide();
            });
        });
    }

    login() {
        this.lock.show();   
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.isAuthenticated = false;   
    }

    getSecretThing() {
        this.http.fetch('http://localhost:20899/values/secured', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            }
        })
        .then(response => response.json())
        .then(data => this.secretThing = data.message);
    }
}
