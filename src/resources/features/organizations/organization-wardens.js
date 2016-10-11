import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import OrganizationService from 'resources/services/organization-service';
import SignalRService from 'resources/services/signalr-service';
import AuthService from 'resources/services/auth-service';
import environment from '../../../environment';

@inject(Router, OrganizationService, SignalRService, authService)
export class OrganizationWardens {
    constructor(router, organizationService, signalRService, authService) {
        this.router = router;
        this.organizationService = organizationService;
        this.signalRService = signalRService;
        this.apiKey = authService.defaultApiKey;
        this.apiUrl = environment.apiUrl.substring(0, environment.apiUrl.length - 1);
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
