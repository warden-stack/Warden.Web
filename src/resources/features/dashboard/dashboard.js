import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import DashboardService from 'resources/services/dashboard-service';
import OrganizationService from 'resources/services/organization-service';
import AuthService from 'resources/services/auth-service';
import SignalRService from 'resources/services/signalr-service';

@inject(Router, DashboardService, OrganizationService, AuthService, SignalRService)
export class Dashboard {
    constructor(router, dashboardService, organizationService, authService, signalRService) {
        this.router = router;
        this.dashboardService = dashboardService;
        this.organizationService = organizationService;
        this.authService = authService;
        this.signalRService = signalRService;
    }

    async activate(){
        this.organizations = await this.organizationService.getAll();
    }

    initializeSignalR(organization){
        if(organization.wardens.length === 0){
            console.log("No Wardens have been found.")

            return;
        }

        var warden = organization.wardens[0];
        console.log(`Initializing default Warden: ${warden.name} for organization: ${organization.name}`)
            this.signalRService.initialize(organization.id, warden.id, function(check) {
            console.log("Received Warden check from Hub.", check);
        });
    }
}
