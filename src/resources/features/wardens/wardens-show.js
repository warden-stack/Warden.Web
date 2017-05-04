import {inject} from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import OrganizationService from 'resources/services/organization-service';
import WardenService from 'resources/services/warden-service'

@inject(OrganizationService, WardenService)
export class WardensShow {
  constructor(organizationService, wardenService) {
    this.organizationService = organizationService;
    this.wardenService = wardenService;
  }

  async activate(params) {
    this.organizationId = params.organizationId;
    this.wardenId = params.wardenId;

    this.warden = await this.wardenService.get(this.organizationId, this.wardenId);
    console.log(this.warden);
  }
}
