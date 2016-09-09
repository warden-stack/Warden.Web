import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import {Router} from 'aurelia-router';

@inject(HttpClient, AuthService, UserService, Router)
export class Login {
    constructor(http, authService, userService, router) {
        this.http = http;
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        var self = this;
        this.lock = authService.getAuth0Lock();
        authService.authenticateViaAuth0(this.lock,
            function(authResult, profile) {
                self.userService.register(profile.user_id)
                    .then(response => {
                        self.redirectToDashboard();
                    });
            });
    }

    redirectToDashboard() {
        this.lock.hide();
        this.router.navigate("");
    }

    login() {
        this.lock.show();   
    }
}
