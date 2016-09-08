import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import DashboardService from 'resources/services/dashboard-service';
import AuthService from 'resources/services/auth-service';

@inject(Router, DashboardService, AuthService)
export class Dashboard {
    constructor(router, dashboardService, authService) {
        this.router = router;
        this.dashboardService = dashboardService;
        this.authService = authService;
        this.dashboardService.getSecretThing();
    }

    logout() {
        this.authService.logout();   
        this.router.navigate("login");
    }
}
