import WardenModel from 'resources/models/warden-model';
import UserModel from 'resources/models/user-model';

export default class OrganizationModel {
  constructor(data) {
    // {
    //   "id": "a295aa48-af69-4fcb-9feb-c4ea9c350d80",
    //   "owner": {
    //     "userId": "dbac93f106724ab7a576598b63c12962",
    //     "email": "snicky700@gmail.com",
    //     "role": "owner",
    //     "createdAt": "2017-04-01T18:52:42.898Z"
    //   },
    //   "name": "default",
    //   "description": null,
    //   "users": [
    //     {
    //       "userId": "dbac93f106724ab7a576598b63c12962",
    //       "email": "snicky700@gmail.com",
    //       "role": "owner",
    //       "createdAt": "2017-04-01T18:52:42.898Z"
    //     }
    //   ],
    //   "wardens": []
    // }

    this.data = data;

    const DIRECT_PROPS = ['id', 'name', 'description', 'status'];
    for (let prop of DIRECT_PROPS) {
      this[prop] = data[prop];
    }

    this.wardens = (data.wardens || []).map((wardenData) => new WardenModel(wardenData));
    this.users = (data.users || []).map((userData) => new UserModel(userData));
    this.owner = new UserModel(data.owner);
  }

  selectWarden(wardenId) {
    return this.wardens.find((warden) => warden.id == wardenId);
  }

  createOrUpdateWatcher(wardenId, watcherData) {
    this.selectWarden(wardenId).createOrUpdateWatcher(watcherData);
  }
}
