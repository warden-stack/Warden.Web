import environment from '../../environment';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import AuthService from 'resources/services/auth-service';
import * as retry from 'retry';

@inject(EventAggregator, AuthService)
export default class SignalRService {
  constructor(eventAggregator, authService) {
    this.eventAggregator = eventAggregator;
    this.authService = authService;
    this.connection = null;
    this.reconnect = true;
  }

  initialize() {
    if (this.connected) {
      return;
    }
    if (!this.authService.isLoggedIn) {
      return;
    }

    this.connection = new RpcConnection(environment.signalRUrl, 'formatType=json&format=text');
    this.connection.on('check_result_created', (message) => {
      this.eventAggregator.publish('check_result_created', message);
    });
    this.connection.on('operation_updated', (message) => {
      this.eventAggregator.publish('operation_updated', message);
    });
    this.connection.on('disconnect', async (message) => {
      this.reconnect = false;
      this.connection.stop();
    });
    this.connection.connectionClosed = e => {
      if (e) {
        console.log('Connection closed with error: ' + e);
      } else {
        console.log('SignalR connection was lost.');
        if (this.reconnect) {
          this.connect();
        }
      }
    };
    this.connect();
  }

  get connected() {
    return this.connection !== null;
  }

  connect() {
    let operation = retry.operation({
      retries: 20,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 5000
    });
    operation.attempt(currentAttempt => {
      console.log(`Connecting to the WardenHub, attempt: ${currentAttempt}.`);
      let connection = this.connection;
      let token = `Bearer ${this.authService.token}`;
      connection.start()
        .then(() => {
          connection.invoke('Warden.Services.Pusher.Hubs.WardenHub.InitializeAsync', token);
        })
        .catch(err => operation.retry(err));
    });
  }
}
