import {inject} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import FormBuilder from 'resources/builders/form-builder';
import OrganizationService from 'resources/services/organization-service';

@inject(Router, FormBuilder, OrganizationService)
export class OrganizationNew {
  constructor(router, formBuilder, organizationService) {
    this.router = router;
    this.organizationService = organizationService;

    this.form = formBuilder.createForm();
    this.form.validationRules.ensure('name')
      .required()
        .withMessageKey('organization.name_is_required')
      .maxLength(100)
        .withMessageKey('organization.name_is_invalid')
      .on(this);

    this.name = '';
    this.description = '';
  }

  async create() {
    const success = await this.form.process(() => {
      return this.organizationService.create(this.name, this.description)
    });
    if (success) this.router.navigateToRoute('organizationsIndex');
  }
}
