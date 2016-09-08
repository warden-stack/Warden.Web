import ApiBaseService from 'resources/services/api-base-service'

export default class DashboardService extends ApiBaseService {
    async getSecretThing() {
        const secured = await this.get('values/secured');
        console.log(secured);

        return secured;
    }
}