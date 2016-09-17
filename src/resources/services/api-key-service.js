import ApiBaseService from 'resources/services/api-base-service';

export default class ApiKeyService extends ApiBaseService {
  async getAll() {
    return await this.get('api-keys');
  }
}
