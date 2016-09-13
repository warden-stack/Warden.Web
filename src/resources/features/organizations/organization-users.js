import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import OrganizationService from 'resources/services/organization-service';

@inject(Router, OrganizationService)
export class OrganizationUsers {
    constructor(router, organizationService) {
        this.router = router;
        this.organizationService = organizationService;
    }

    async activate(params){
        let organization = await this.organizationService.getSingle(params.id);
        this.users = organization.users;
    }
}
