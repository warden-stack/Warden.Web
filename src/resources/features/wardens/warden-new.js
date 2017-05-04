import {inject} from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import FormBuilder from 'resources/builders/form-builder';
import OrganizationService from 'resources/services/organization-service';
import WardenService from 'resources/services/warden-service'

@inject(Router, FormBuilder, OrganizationService, WardenService)
export class WardenNew {
  constructor(router, formBuilder, organizationService, wardenService) {
    this.router = router;
    this.formBuilder = formBuilder;
    this.organizationService = organizationService;
    this.wardenService = wardenService;

    this.form = this.formBuilder.createForm();
    this.form.validationRules.ensure('name')
      .required()
        .withMessageKey('warden.name_is_required')
      .maxLength(100)
        .withMessageKey('warden.name_is_invalid')
      .on(this);

    this.name = '';
    this.enabled = true;
  }

  async activate(params) {
    this.organizationId = params.organizationId;
    this.organization = await this.organizationService.get(this.organizationId);
  }

  async create() {
    const success = await this.form.process(() => {
      return this.wardenService.create(this.organizationId, this.name, this.enabled)
    });
    if (success) {
      this.router.navigateToRoute('organizationShow', {
        organizationId: this.organizationId
      });
    }
  }
}
