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
    }

    async activate(){
    }
}
