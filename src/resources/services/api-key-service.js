import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, OperationService)
export default class ApiKeyService {
  constructor(apiBaseService, operationService)  {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
  }

  async getAll() {
    return await this.get('api-keys');
  }


  async create(name) {
    let request = {
      name
    };

    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('api-keys', request));
  }
}
