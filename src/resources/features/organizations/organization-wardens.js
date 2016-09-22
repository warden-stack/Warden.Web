import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import OrganizationService from 'resources/services/organization-service';
import SignalRService from 'resources/services/signalr-service';
import AuthService from 'resources/services/auth-service';
import AppConfig from 'resources/app-config';

@inject(Router, OrganizationService, SignalRService, AuthService, AppConfig)
export class OrganizationWardens {
    constructor(router, organizationService, signalRService, authService, appConfig) {
        this.router = router;
        this.organizationService = organizationService;
        this.signalRService = signalRService;
        this.apiKey = authService.defaultApiKey;
        this.apiUrl = appConfig.apiUrl.substring(0, appConfig.apiUrl.length - 1);
    }

    async activate(params){
        this.organization = await this.organizationService.getSingle(params.id);
        this.wardens = this.organization.wardens;
    }
    
    initializeSignalR(warden){
        console.log(`Initializing Warden: ${warden.name}.`);
        this.signalRService.initialize(this.organization.id, warden.id, function(check) {
            console.log("Received Warden check from Hub.", check);
        });
    }
}
