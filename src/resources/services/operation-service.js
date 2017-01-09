import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import AuthService from 'resources/services/auth-service';
import ApiBaseService from 'resources/services/api-base-service';
import SignalRService from 'resources/services/signalr-service';
import * as retry from 'retry';

@inject(EventAggregator, AuthService, ApiBaseService, SignalRService)
export default class OperationService {
  constructor(eventAggregator, authService, apiBaseService, signalR) {
    this.eventAggregator = eventAggregator;
    this.authService = authService;
    this.apiBaseService = apiBaseService;
    this.signalR = signalR;
    this.processedOperations = [];
    this.subscriptions = [];
    this.signalRTimeoutSeconds = 5;
    this.signalR.initialize();
    this._initializeOperations();
    this.eventAggregator.subscribe('operation_updated', async message => {
      this.handleOperationUpdated(message);
    });
  }

  _initializeOperations() {
    this.operations = [
      map('sign_up', 'signed_up')
    ];

    function map(name, event) {
      return { name, event: { success: event, rejected: `${name}_rejected`} };
    }
  }

  subscribe(operation, onSuccess, onRejected) {
    let availableOperation = this.operations.find(x => x.name === operation);
    if (availableOperation === null || typeof availableOperation === 'undefined') {
      return;
    }
    this.subscriptions.push({ operation, onSuccess, onRejected, event: availableOperation.event });
  }

  unsubscribeAll() {
    this.subscriptions = [];
  }

  async execute(fn) {
    let response = await fn();
    let endpoint = response['x-operation'];
    let resource = response['x-resource'];
    if (!endpoint) {
      return ({success: false, message: 'Operation has not been found.', code: 'error'});
    }

    let requestId = endpoint.split('/')[1];
    if (this.authService.isLoggedIn) {
      //Wait 5 seconds for SignalR to complete - if there's no response then fallback to the API call.
      this.processedOperations.push({
        key: endpoint,
        processed: false,
        value: { completed: false, resource: resource }
      });
      setTimeout(async () => {
        if (this.isOperationProcessed(requestId)) {
          return;
        }
        await this.tryFetchOperation(endpoint);
      }, this.signalRTimeoutSeconds * 1000);

      return;
    }
    //If user is not authenticated simply fetch operation result from the API.
    await this.tryFetchOperation(endpoint);
  }

  async tryFetchOperation(endpoint) {
    let retryOperation = retry.operation({
      retries: 10,
      minTimeout: 500,
      maxTimeout: 1000
    });

    retryOperation.attempt(async currentAttempt => {
      let operation = await this.fetchOperationState(endpoint);
      if (operation.completed === false) {
        retryOperation.retry('Operation has not completed.');
      } else {
        this._publishOperationUpdated(operation);
      }
    });
  }

  async fetchOperationState(endpoint, next) {
    let operation = await this.getOperation(endpoint);
    if (operation.statusCode === 404) {
      return { completed: false };
    }
    if (operation.state === 'created') {
      return { completed: false };
    }

    return {
      completed: true,
      name: operation.name,
      success: operation.success,
      code: operation.code,
      message: operation.message,
      resource: operation.resource
    };
  }

  async getOperation(endpoint) {
    return await this.apiBaseService.get(endpoint, {}, false);
  }

  getProcessedOperation(requestId) {
    let key = `operations/${message.requestId}`;

    return this.processedOperations.find(x => x.key === key);
  }

  isOperationProcessed(requestId) {
    let processedOperation = getProcessedOperation(message.requestId);
    if (processedOperation === null || typeof processedOperation === 'undefined') {
      return false;
    }

    return processedOperation.processed;
  }

  handleOperationUpdated(message) {
    let processedOperation = getProcessedOperation(message.requestId);
    if (processedOperation === null || typeof processedOperation === 'undefined') {
      return;
    }

    processedOperation.processed = true;
    let operation = processedOperation.value;
    operation.name = message.name;
    operation.completed = true;
    operation.success = message.state === 'completed';
    operation.code = message.code;
    operation.message = message.message;
    this._publishOperationUpdated(operation);
  }

  //Depends whether the operation comes from the SignalR or API
  //it will either contain the command name or the event name.
  _publishOperationUpdated(operation) {
    this.subscriptions.forEach(x => {
      handleSignalRCall(x);
      handleApiCall(x);
    });

    function handleApiCall(subscriber) {
      if (subscriber.operation !== operation.name) {
        return;
      }
      if (operation.success) {
        subscriber.onSuccess(operation);

        return;
      }
      subscriber.onRejected(operation);
    }

    function handleSignalRCall(subscriber) {
      if (subscriber.event.success === operation.name) {
        subscriber.onSuccess(operation);

        return;
      }
      if (subscriber.event.rejected === operation.name) {
        subscriber.onRejected(operation);
      }
    }
  }
}
