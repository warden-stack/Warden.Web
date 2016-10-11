import {inject} from 'aurelia-framework';
import environment from '../../environment';

export default class AuthService {
    constructor() {
    }

    get idToken() {
        return localStorage.getItem(environment.idTokenStorageKey);
    }

    set idToken(newToken) {
        localStorage.setItem(environment.idTokenStorageKey, newToken);
    }

    removeIdToken() {
        localStorage.removeItem(environment.idTokenStorageKey);
    }

    get accessToken() {
        return localStorage.getItem(environment.accessTokenStorageKey);
    }

    set accessToken(newToken) {
        localStorage.setItem(environment.accessTokenStorageKey, newToken);
    }

    removeAccessToken() {
        localStorage.removeItem(environment.accessTokenStorageKey);
    }
    
    get apiKeys(){
        return JSON.parse(localStorage.getItem(environment.apiKeysStorageKey));
    }

    set apiKeys(apiKeys) {
        return localStorage.setItem(environment.apiKeysStorageKey, JSON.stringify(apiKeys));
    }

    get defaultApiKey(){
        var apiKeys = this.apiKeys;
        if(apiKeys.length === 0)
            return "Missing API key";
        
        return apiKeys[0];
    }

    removeApiKeys() {
        localStorage.removeItem(environment.apiKeysStorageKey);
    }

    get isLoggedIn() {
        return !!this.idToken;
    }

    get profile() {
        return localStorage.getItem(environment.profileStorageKey);
    }

    set profile(newProfile) {
        localStorage.setItem(environment.profileStorageKey, newProfile);
    }

    removeProfile() {
        localStorage.removeItem(environment.profileStorageKey);
    }

    authorizeRequest(request) {
        if (this.idToken && request.headers.append) {
            //console.log("Authorizing request " + request.url + " using token " + this.idToken);
            //request.headers.append("Authorization", `Bearer ${this.idToken}`);
            //console.log(request.headers);
        }

        return request;
    }

    getAuth0Lock() {
        return new Auth0Lock(environment.auth0.token, environment.auth0.domain);
    }

    authenticateViaAuth0(lock, next) {
        var self = this;
        lock.on("authenticated",
            (authResult) => {
                lock.getProfile(authResult.idToken,
                    (error, profile) => {
                        if (error) {
                            // Handle error
                            return;
                        }

                        self.idToken = authResult.idToken;
                        self.accessToken = authResult.accessToken;
                        self.profile = JSON.stringify(profile);
                        next(authResult,profile);
                    });
            });
    }

    logout () {
        this.removeIdToken();
        this.removeAccessToken();
        this.removeApiKeys();
        this.removeProfile();
    }
}
