import ApiBaseService from 'resources/services/api-base-service'

export default class WardenService extends ApiBaseService {
    async spawn(configuration) {
		return await this.post("warden/spawn", configuration);
    } 
}