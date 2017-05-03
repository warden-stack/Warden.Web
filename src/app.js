import {inject} from 'aurelia-framework';
import PreLoginRoute from 'resources/middleware/pre-login-route';
import AuthorizeStep from 'resources/middleware/authorize-step';
import LoaderHandler from 'resources/middleware/loader-handler';
import {EventAggregator} from 'aurelia-event-aggregator';
import TranslationService from 'resources/services/translation-service';
import {ValidationMessageProvider} from 'aurelia-validation';
import environment from './environment';
import routes from 'resources/routes';

@inject(EventAggregator, TranslationService)
export class App {
  constructor(eventAggregator, translationService) {
    this.eventAggregator = eventAggregator;

    // ValidationRules.getMessageKey should work with I18n keys.
    ValidationMessageProvider.prototype.getMessage = function(key) {
      const translation = translationService.tr(key);
      return this.parser.parseMessage(translation);
    };
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = environment.title;
    config.addPipelineStep('authorize', PreLoginRoute);
    config.addPipelineStep('authorize', AuthorizeStep);
    config.addPipelineStep('authorize', LoaderHandler);
    config.map(routes);
    config.options.pushState = true;
  }

  activate() {
    this.eventAggregator.subscribe('loader:display', response => {
      this.loaderActive = true;
    });
    this.eventAggregator.subscribe('loader:hide', response => {
      this.loaderActive = false;
    });
  }
}
