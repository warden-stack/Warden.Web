import {inject} from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import FormBuilder from 'resources/builders/form-builder';
import ApiKeyService from 'resources/services/api-key-service'

@inject(Router, FormBuilder, ApiKeyService)
export class WardenNew {
  constructor(router, formBuilder, apiKeyService) {
    this.router = router;
    this.formBuilder = formBuilder;
    this.apiKeyService = apiKeyService;

    this.form = this.formBuilder.createForm();
    this.form.validationRules.ensure('name')
      .required()
        .withMessageKey('api_key.name_is_required')
      .maxLength(100)
        .withMessageKey('api_key.name_is_invalid')
      .on(this);

    this.name = '';
  }

  async create() {
    const success = await this.form.process(() => {
      return this.apiKeyService.create(this.name)
    });
    if (success) this.router.navigateToRoute('apiKeysIndex');
  }
}
