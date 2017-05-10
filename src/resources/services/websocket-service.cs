import environment from '../../environment';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import AuthService from 'resources/services/auth-service';
import LogService from 'resources/services/log-service';
import io from 'socket.io-client';

@inject(EventAggregator, AuthService, LogService)
export default class WebsocketService {
  constructor(eventAggregator, authService, logService) {
    this.eventAggregator = eventAggregator;
    this.authService = authService;
    this.logger = logService;
    this.socket = null;
    this.reconnect = true;
  }

  initialize() {
    if (this.initalized) {
      return;
    }
    if (!this.authService.isLoggedIn) {
      return;
    }

    console.log('connecting to socket io server');
    let socket = io.connect(environment.websocketUrl, {
      path: environment.websocketPath
    });
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('authenticate', {token: this.authService.token});
    });
    socket.on('authenticated', () => {
      console.log('authenticated');
      socket.on('operation_updated', (message) => {
        this.logger.debug('operation_updated message received', message);
        this.eventAggregator.publish('operation:updated', message);
      });
      socket.on('warden_check_result_processed', (message) => {
        this.logger.debug('warden_check_result_processed message received', message);
        this.eventAggregator.publish('warden_check_result:processed', message);
      });
    });
    socket.on('authentication_failed', () => {
      console.log('authentication failed, disconnecting');
      socket.disconnect();
    });
    this.socket = socket;
  }

  get initalized() {
    return this.socket !== null;
  }

  get connected() {
    return this.socket !== null && this.socket.connected;
  }
}
