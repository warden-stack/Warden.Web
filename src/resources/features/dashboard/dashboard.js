import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import DashboardService from 'resources/services/dashboard-service';
import AuthService from 'resources/services/auth-service';
import SignalRService from 'resources/services/signalr-service';

@inject(Router, DashboardService, AuthService, SignalRService)
export class Dashboard {
    constructor(router, dashboardService, authService, signalRService) {
        this.router = router;
        this.dashboardService = dashboardService;
        this.authService = authService;
        this.signalRService = signalRService;

        //TODO: Remove hardcoded values.
        var organizationId = "WzoJnQI0oEq5tmu9irTKXg";
        var wardenId = "R8wO5nNnXU6kFojXyiG1GA";
        this.signalRService.initialize(organizationId, wardenId, function(check) {
            console.log("Received Warden check from Hub.", check);
        });
    }
}
