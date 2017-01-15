import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import TranslationService from 'resources/services/translation-service';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import DashboardService from 'resources/services/dashboard-service';
import AuthService from 'resources/services/auth-service';
import SignalRService from 'resources/services/signalr-service';
import OrganizationService from 'resources/services/organization-service';
import WardenService from 'resources/services/warden-service';
import ApiKeyService from 'resources/services/api-key-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import OperationService from 'resources/services/operation-service';

@inject(Router, TranslationService, ValidationControllerFactory, DashboardService, AuthService,
  SignalRService, OrganizationService, WardenService, ApiKeyService,
  ToastService, LoaderService, OperationService)
export class Dashboard {
  constructor(router, translationService, controllerFactory, dashboardService, authService,
  signalRService, organizationService, wardenService, apiKeyService,
  toast, loader, operationService) {
    this.router = router;
    this.translationService = translationService;
    this.dashboardService = dashboardService;
    this.authService = authService;
    this.signalR = signalRService;
    this.organizationService = organizationService;
    this.wardenService = wardenService;
    this.apiKeyService = apiKeyService;
    this.operationService = operationService;
    this.toast = toast;
    this.loader = loader;
    this.organizationId = '';
    this.request = {
      organization: 'My organization',
      warden: 'My warden',
      apiKey: 'My API key'
    };
    this.signalR.initialize();

    this.sending = false;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    ValidationRules
      .ensure('organization')
        .required()
          .withMessage(this.translationService.tr('organization.name_is_required'))
        .maxLength(50)
          .withMessage(this.translationService.tr('organization.name_is_invalid'))
      .ensure('warden')
        .required()
          .withMessage(this.translationService.tr('warden.name_is_required'))
        .maxLength(50)
      .ensure('apiKey')
        .required()
          .withMessage(this.translationService.tr('api_key.name_is_required'))
        .maxLength(50)
          .withMessage(this.translationService.tr('api_key.name_is_invalid'))
      .on(this.request);
  }

  async activate() {
  }

  attached() {
    this.operationService.subscribe('create_organization',
      operation => this.handleOrganizationCreated(operation),
      operation => this.handleCreateOrganizationRejected(operation));

    this.operationService.subscribe('create_warden',
      operation => this.handleWardenCreated(operation),
      operation => this.handleCreateWardenRejected(operation));

    this.operationService.subscribe('create_api_key',
      operation => this.handleApiKeyCreated(operation),
      operation => this.handleCreateApiKeyRejected(operation));
  }

  detached() {
    this.operationService.unsubscribeAll();
  }

  async godmode() {
    let errors = await this.controller.validate();
    if (errors.length > 0) {
      return;
    }

    this.sending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('organiztion.activating_godmode'));
    await this.organizationService.create(this.request.organization, `${this.request.organization} description.`);
  }

  async handleOrganizationCreated(operation) {
    this.loader.hide();
    this.sending = false;
    this.toast.success(this.translationService.tr('organization.created'));
    this.organizationId = operation.resource.split('/')[1];
    await this.wardenService.create(this.organizationId, this.request.warden);
  }

  handleCreateOrganizationRejected(operation) {
    this.sending = false;
    this.loader.hide();
    this.toast.error(this.translationService.trCode(operation.code));
  }

  async handleWardenCreated(operation) {
    this.loader.hide();
    this.sending = false;
    this.toast.success(this.translationService.tr('warden.created'));
    await this.apiKeyService.create(this.request.apiKey);
  }

  handleCreateWardenRejected(operation) {
    this.sending = false;
    this.loader.hide();
    this.toast.error(this.translationService.trCode(operation.code));
  }

  handleApiKeyCreated(operation) {
    this.loader.hide();
    this.sending = false;
    this.toast.success(this.translationService.tr('api_key.created'));
    this.toast.success(this.translationService.tr('organiztion.godmode_activated'));
  }

  handleCreateApiKeyRejected(operation) {
    this.sending = false;
    this.loader.hide();
    this.toast.error(this.translationService.trCode(operation.code));
  }
}
