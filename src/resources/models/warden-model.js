export default class WardenModel {
  constructor(data) {
    this.data = data;

    const DIRECT_PROPS = ['id', 'name'];
    for (let prop of DIRECT_PROPS) {
      this[prop] = data[prop];
    }

    // TODO: WatcherModel
    // this.watchers = data.watchers.map((watcherData) => new WatcherModel(watcherData));

    // TODO: This might need to be pulled directly from data in the future!
    this.watchersData  = {};
    this.watchersCount = 0;
    this.status = 'off';
  }

  createOrUpdateWatcher(watcherData) {
    this.watchersData[watcherData.watcherName] = watcherData;
    this.watchersCount = Object.keys(this.watchersData).length;
    // TODO: This line is nonsense, but let's keep it since we don't have
    //       any status on watchers yet.
    this.status = 'ok';
  }
}
