import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import AuthService from 'resources/services/auth-service';
import {Router} from 'aurelia-router';

@inject(HttpClient, AuthService, Router)
export class Login {
    constructor(http, authService, router) {
        this.http = http;
        this.authService = authService;
        this.router = router;
        var self = this;
        this.lock = authService.getAuth0Lock();
        authService.authenticateViaAuth0(this.lock, function() {
            self.lock.hide();
            self.router.navigate("");
        });
    }

    login() {
        this.lock.show();   
    }
}
