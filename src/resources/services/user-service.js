import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import CacheService from 'resources/services/cache-service';
import AuthService from 'resources/services/auth-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, CacheService, AuthService, OperationService)
export default class UserService {
  constructor(apiBaseService, cacheService, authService, operationService)  {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
  }

  async signIn(account) {
    return await this.apiBaseService.post('sign-in', account);
  }

  async signUp(account) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('sign-up', account));
  }

  async getAccount(cache = true) {
    return await this.apiBaseService.get('account', {}, cache);
  }

  async getAccountByName(name) {
    return await this.apiBaseService.get(`users/${name}`);
  }

  async isNameAvailable(name) {
    return await this.apiBaseService.get(`usernames/${name}/available`, {}, false);
  }

  async changeUsername(name) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put('account/name', { name }));
  }

  async changePassword(currentPassword, newPassword) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put('account/password', { currentPassword, newPassword }));
  }

  async resetPassword(email) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('reset-password', { email }));
  }

  async setNewPassword(email, token, password) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('reset-password/set-new', { email, token, password }));
  }
}
