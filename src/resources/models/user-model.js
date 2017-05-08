export default class UserModel {
  constructor(data) {
    //     "userId": "dbac93f106724ab7a576598b63c12962",
    //     "email": "snicky700@gmail.com",
    //     "role": "owner",
    //     "createdAt": "2017-04-01T18:52:42.898Z"

    this.data = data;

    const DIRECT_PROPS = ['id', 'email', 'role'];
    for (let prop of DIRECT_PROPS) {
      this[prop] = data[prop];
    }
  }
}
