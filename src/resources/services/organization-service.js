import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, OperationService)
export default class OrganizationService {
  constructor(apiBaseService, operationService)  {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
  }

  async getAll() {
    return await this.get('organizations');
  }

  async getSingle(id) {
    return await this.get(`organizations/${id}`);
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
