import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import {
  ValidationControllerFactory,
  ValidationRules,
  validateTrigger
} from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';

class Form {
  constructor(apiBaseService, validationControllerFactory) {
    this.apiBaseService = apiBaseService;
    this.validationController = validationControllerFactory.createForCurrentScope();
    this.validationController.validateTrigger = validateTrigger.blur;
    this.validationController.addRenderer(new MaterializeFormValidationRenderer());
  }
  get validationRules() {
    return ValidationRules;
  }
  async process(apiCallFn) {
    this.errorMessages = [];
    const validationErrors = await this.validationController.validate();
    if (validationErrors.length == 0) {
      // Valid, call the API.
      this.processing = true;
      const response = await apiCallFn();
      this.errorMessages = this.apiBaseService.extractErrorMessages(response);
      if (this.errorMessages) this.processing = false;
      return !this.errorMessages;
    }
  }
}

@inject(ApiBaseService, ValidationControllerFactory)
export default class FormBuilder {
  constructor(apiBaseService, validationControllerFactory) {
    this.apiBaseService = apiBaseService;
    this.validationControllerFactory = validationControllerFactory
  }

  createForm() {
    return new Form(this.apiBaseService, this.validationControllerFactory);
  }
}
