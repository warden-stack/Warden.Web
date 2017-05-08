import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import OrganizationService from 'resources/services/organization-service';
import OrganizationModel from 'resources/models/organization-model';
import io from 'socket.io-client';

@inject(Router, OrganizationService)
export class OrganizationShow {
  constructor(router, organizationService) {
    // TODO: Move to a global config somewhere.
    const SOCKET_URL = 'http://207.154.218.86:15000';

    this.router = router;
    this.organizationService = organizationService;
    this.socket = io.connect(SOCKET_URL);
  }

  async activate(params) {
    const { organizationId } = params;

    // TODO: Eventualy the model initialization should occur in the api service!
    this.org = new OrganizationModel(await this.organizationService.get(organizationId));
    this.loadOtherOrganizations()
    this.handleWebsockets();
  }

  async loadOtherOrganizations() {
    const allOrganizations = await this.organizationService.getAll();
    this.otherOrganizations= allOrganizations.filter((org) => org.id != this.org.id)
                                             .map((orgData) => new OrganizationModel(orgData));
  }

  handleWebsockets() {
    this.socket.on('warden_check_result_processed', this.socketCallback.bind(this));
  }

  socketCallback(data) {
    this.org.createOrUpdateWatcher(data.wardenId, data.result.watcherCheckResult);
  }

  deactivate() {
    this.socket.off('warden_check_result_processed', this.socketCallback.bind(this));
  }

  organizationRoute(organization) {
    return this.router.generate('organizationShow', {
      organizationId: organization.id
    });
  }

  wardenRoute(warden) {
    return this.router.generate('wardenShow', {
      organizationId: this.org.id,
      wardenId: warden.id
    });
  }
}
