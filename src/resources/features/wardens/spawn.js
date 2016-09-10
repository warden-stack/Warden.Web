import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import WardenService from 'resources/services/warden-service';

@inject(Router, WardenService)
export class Spawn {
    constructor(router, wardenService) {
        this.router = router;
        this.wardenService = wardenService;
        this.code = "";
        this.wardenSpawned = false;
    }

    activate(){
    }

    spawn(){
    	this.wardenSpawned = true;
    	this.wardenService.spawn(this.code);
    }
}
