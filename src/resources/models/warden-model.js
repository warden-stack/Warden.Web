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
    this.setStatusWaiting();
  }

  createOrUpdateWatcher(watcherData) {
    this.watchersData[watcherData.watcherName] = watcherData;
    this.watchersCount = Object.keys(this.watchersData).length;
    // TODO: This line is nonsense, but let's keep it since we don't have
    //       any status on watchers yet.
    this.setStatus();
  }

  setStatus() {
    for (let watcherData of Object.values(this.watchersData)) {
      if (watcherData.errors && watcherData.errors.length > 0) {
        this.setStatusFail();
        return;
      }
    }
    this.setStatusOk();
  }

  setStatusOk() {
    this.status = 'ok';
  }

  setStatusFail() {
    this.status = 'fail';
  }

  setStatusWaiting() {
    this.status = 'waiting';
  }

  isStatusOk() {
    this.status == 'ok';
  }

  isStatusFail() {
    this.status == 'fail';
  }
}
