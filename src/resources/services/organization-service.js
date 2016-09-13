import ApiBaseService from 'resources/services/api-base-service';

export default class OrganizationService extends ApiBaseService {
  async getAll() {
    return await this.get('organizations');
  }

  async getSingle(id) {
    return await this.get(`organizations/${id}`);
  }
}
