import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, OperationService)
export default class WardenService {
  constructor(apiBaseService, operationService)  {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
  }

  async create(organizationId, name) {
    let request = {
      name
    };

    return await this.operationService.execute(async ()
      => await this.apiBaseService.post(`organizations/${organizationId}/wardens`, request));
  }
}
