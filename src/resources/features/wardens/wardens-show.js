import {inject} from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import OrganizationService from 'resources/services/organization-service';
import OrganizationModel from 'resources/models/organization-model';
import WardenService from 'resources/services/warden-service'
import WardenModel from 'resources/models/warden-model';
import io from 'socket.io-client';

@inject(OrganizationService, WardenService)
export class WardensShow {
  constructor(organizationService, wardenService) {
    // TODO: Move to a global config somewhere.
    const SOCKET_URL = 'https://services.getwarden.net';

    this.organizationService = organizationService;
    this.wardenService = wardenService;
    this.socket = io.connect(SOCKET_URL);
    this.handleWebsockets();

    // HACK (read below)
    this._watchersCount = 0;
  }

  async activate(params) {
    this.organizationId = params.organizationId;

    this.organization = new OrganizationModel(await this.organizationService.get(this.organizationId));
    this.warden = this.organization.selectWarden(params.wardenId);
  }

  handleWebsockets() {
    this.socket.on('warden_check_result_processed', this.socketCallback.bind(this));
  }

  socketCallback(data) {
    this.warden.createOrUpdateWatcher(data.result.watcherCheckResult);

    // TODO: This is terrible and causes reloading of the whole watchers table
    //       (and animation glitches), but I still have to find a way to properly
    //       iterate over an object using repeat.for and re-render on change.
    const _watchers = Object.values(this.warden.watchersData);
    if (_watchers.length != this._watchersCount) {
      this._watchersCount = _watchers.length;
      this.watchersData = Object.values(this.warden.watchersData);
    }
  }

  deactivate() {
    this.socket.off('warden_check_result_processed', this.socketCallback.bind(this));
  }
}
