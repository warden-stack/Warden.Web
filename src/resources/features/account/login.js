import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import AuthService from 'resources/services/auth-service';
import ApiKeyService from 'resources/services/api-key-service';
import UserService from 'resources/services/user-service';
import {Router} from 'aurelia-router';

@inject(HttpClient, AuthService, ApiKeyService, UserService, Router)
export class Login {
    constructor(http, authService, apiKeyService, userService, router) {
        this.http = http;
        this.authService = authService;
        this.apiKeyService = apiKeyService;
        this.userService = userService;
        this.router = router;
        let self = this;
        this.lock = authService.getAuth0Lock();
        authService.authenticateViaAuth0(this.lock,
            function(authResult, profile) {
                self.userService.signIn(authResult.accessToken)
                    .then(authResponse => {
                        self.apiKeyService.getAll().then(apiKeysResponse => {
                            self.authService.apiKeys = apiKeysResponse;
                            self.redirectToDashboard();
                        });
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
