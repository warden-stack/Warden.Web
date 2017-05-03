import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import {
  ValidationControllerFactory,
  ValidationRules,
  validateTrigger
} from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';

class Form {
  constructor(apiBaseService, validationControllerFactory, viewModel) {
    this.apiBaseService = apiBaseService;
    this.viewModel = viewModel;
    this.viewModel.validationController = validationControllerFactory.createForCurrentScope();
    this.viewModel.validationController.validateTrigger = validateTrigger.blur;
    this.viewModel.validationController.addRenderer(new MaterializeFormValidationRenderer());
  }
  get validationRules() {
    return ValidationRules;
  }
  async process(apiCallFn) {
    const validationErrors = await this.viewModel.validationController.validate();
    if (validationErrors.length == 0) {
      // Valid, call the API.
      this.viewModel.sending = true;
      const response = await apiCallFn();
      this.viewModel.errorMessages = this.apiBaseService.extractErrorMessages(response);
      if (this.viewModel.errorMessages) this.viewModel.sending = false;
      return !this.viewModel.errorMessages;
    }
  }
}

@inject(ApiBaseService, ValidationControllerFactory)
export default class FormService {
  constructor(apiBaseService, validationControllerFactory) {
    this.apiBaseService = apiBaseService;
    this.validationControllerFactory = validationControllerFactory
  }

  setup(viewModel) {
    return new Form(this.apiBaseService, this.validationControllerFactory, viewModel);
  }
}
