import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, OperationService)
export default class OrganizationService {
  constructor(apiBaseService, operationService)  {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
  }

  async get(id) {
    return await this.apiBaseService.get(`organizations/${id}`);
  }

  async getAll() {
    return await this.apiBaseService.get('organizations');
  }

  async create(name, description) {
    let request = {
      name,
      description
    };

    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('organizations', request));
  }
}
