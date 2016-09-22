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
        var hubConnection = $.hubConnection(this.appConfig.signalRUrl, { qs: {accessToken, organizationId, wardenId}, logging: false, useDefaultPath: false });
        var wardenHub = hubConnection.createHubProxy('wardenHub');
        console.log(`Starting SignalR - organization id ${organizationId}, warden id: ${wardenId}, accessToken: ${accessToken}.`)
        // var wardenHub = $.connection.wardenHub;
        wardenHub.on('checkSaved', function (check) {
            onCheckSaved(check);
        });
        hubConnection.start()
            .done(function() {
                console.log("Established connection to the Warden Hub.");
            })
            .fail(function() {
                console.log("Could not connect to the Warden Hub.");
            });
    }
}