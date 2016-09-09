import {inject} from 'aurelia-framework';
import AppConfig from 'resources/app-config'
import AuthService from 'resources/services/auth-service';

@inject(AuthService, AppConfig)
export default class SignalRService {
    constructor(authService, appConfig) {
        this.authService = authService;
        this.appConfig = appConfig;
    }

    initialize(organizationId, wardenId, onCheckSaved) {
        var accessToken = this.authService.accessToken;
        $.connection.hub.url = this.appConfig.signalRUrl;
        $.connection.hub.qs = { accessToken, organizationId, wardenId};
        var wardenHub = $.connection.wardenHub;
        wardenHub.client.checkSaved = function (check) {
            onCheckSaved(check);
        };
        $.connection.hub.start()
            .done(function() {
                console.log("Connected to the Warden Hub.");
            })
            .fail(function() {
                console.log("Could not connect to the Warden Hub.");
            });
    }
}